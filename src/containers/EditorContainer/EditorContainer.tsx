import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils } from 'draft-js';

import classes from './EditorContainer.module.css';

const inlineStyles = [
    { icon: 'B', type: 'BOLD', class: classes.BoldButton },
    { icon: 'I', type: 'ITALIC', class: classes.ItalicButton },
    { icon: 'U', type: 'UNDERLINE', class: classes.UnderlineButton }
];

export const EditorContainer = () => {
    const content = localStorage.getItem('content');
    const [editorState, setEditorState] = useState(content ? () => EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : () => EditorState.createEmpty());
    const contentState = editorState.getCurrentContent();
    const editorContainerRef = useRef<HTMLDivElement>(null);
    // Flags if container component has just been loaded, only changes to false when editor gets used
    const [appStart, setAppStart] = useState(true);
    const [savingStr, setSavingStr] = useState(false);

    // Debounce save feature
    useEffect(() => {
        setSavingStr(false);
        let timer = setTimeout(() => {
            const rawContent = convertToRaw(contentState);
            localStorage.setItem('content', JSON.stringify(rawContent));
            if (!appStart) {
                setSavingStr(true);
            }
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    }, [contentState, appStart]);

    // Allows save message to appear after a key has been pressed in the editing container
    useEffect(() => {
        editorContainerRef.current?.addEventListener('keydown', () => {
            setAppStart(false);
        });
    }, []);

    // Removes save message a few seconds after saving
    useEffect(() => {
        if (savingStr === true) {
            setTimeout(() => {
                setSavingStr(false);
            }, 2500);
        }
    }, [savingStr]);

    // Basic function to handle key commands
    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        } else {
            return 'not-handled';
        }
    }

    // Handles editor button commands for inline styles
    const onInlineStyleClick = (e: SyntheticEvent, command: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, command));
        if (appStart) {
            setAppStart(false);
        }
    };

    return (
        <div>
            {inlineStyles.map(style => (
                <button
                    key={style.type}
                    className={[classes.InlineButton, style.class].join(' ')}
                    onMouseDown={(e) => onInlineStyleClick(e, style.type)}
                >{style.icon}</button>
            ))}
            <div ref={editorContainerRef} className={classes.EditorContainer}>
                <Editor
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </div>
            {savingStr ? <p>Saved!</p> : null}
        </div>
    );
};

export default EditorContainer;

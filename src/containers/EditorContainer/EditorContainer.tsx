import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';

import classes from './EditorContainer.module.css';

const styles = [
    { icon: 'B', type: 'BOLD', class: classes.BoldButton },
    { icon: 'I', type: 'ITALIC', class: classes.ItalicButton },
    { icon: 'U', type: 'UNDERLINE', class: classes.UnderlineButton }
];

export const EditorContainer = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const contentState = editorState.getCurrentContent();
    const editorRef = useRef<Editor>(null);

    // Debounce mock save feature
    useEffect(() => {
        let timer = setTimeout(() => {
            console.log(contentState.getPlainText());
            const rawContent = convertToRaw(contentState);
            console.log(rawContent);
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    }, [contentState]);

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
    };

    return (
        <div>
            {styles.map(style => (
                <button
                    key={style.type}
                    className={[classes.InlineButton, style.class].join(' ')}
                    onMouseDown={(e) => onInlineStyleClick(e, style.type)}
                >{style.icon}</button>
            ))}
            <div className={classes.EditorContainer}>
                <Editor
                    ref={editorRef}
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </div>
        </div>
    );
};

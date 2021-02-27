import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils } from 'draft-js';

import classes from './EditorContainer.module.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const inlineStyles = [
    { icon: 'B', type: 'BOLD', class: classes.BoldButton },
    { icon: 'I', type: 'ITALIC', class: classes.ItalicButton },
    { icon: 'U', type: 'UNDERLINE', class: classes.UnderlineButton }
];

interface PropTypes {
    id: string;
    saveNote: (id: string, content: string) => {};
    content: string;
}

export const EditorContainer = ({ id, saveNote, content }: PropTypes) => {
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
            saveNote(id, JSON.stringify(convertToRaw(contentState)));
            if (!appStart) {
                setSavingStr(true);
            }
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    }, [contentState, appStart, saveNote, id]);

    // Allows save message to appear after a key has been pressed in the editing container
    useEffect(() => {
        editorContainerRef.current?.addEventListener('keydown', () => {
            setAppStart(false);
        });
    }, []);

    useEffect(() => {
        setAppStart(true);
    }, [id]);

    // Removes save message a few seconds after saving
    useEffect(() => {
        let timer = setTimeout(() => {
            if (savingStr === true) setSavingStr(false);
        }, 2500);

        return () => {
            clearTimeout(timer);
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
            <p>{id}</p>
            {savingStr ? <p>Saved!</p> : null}
        </div>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        content: state.notes.filter((item: any) => item.id === ownProps.id)[0].content
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        saveNote: (id: string, content: string) => dispatch({ type: 'SAVE_NOTE', id, title: '', content }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);

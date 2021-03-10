import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils, Modifier } from 'draft-js';

import classes from './EditorContainer.module.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import NoteTitle from '../NoteTitle/NoteTitle';
import colorData from '../../colors.json';
import EditorButtonContainer from '../EditorButtonContainer/EditorButtonContainer';

interface PropTypes {
    id: string;
    saveNote: (id: string, content: string) => {};
    saveTitle: (id: string, title: string) => {};
    content: string;
}

const textColorMap: { [key: string]: {} } = {};
const highlightColorMap: { [key: string]: {} } = {};

for (let item of colorData.basic) {
    textColorMap[`${item.name}-COLOR`] = { color: item.color };
    highlightColorMap[`${item.name}-HIGHLIGHT`] = { backgroundColor: item.color };
}

const EditorContainer = ({ id, saveNote, saveTitle, content }: PropTypes) => {
    const [editorState, setEditorState] = useState(content ? () => EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : () => EditorState.createEmpty());
    const contentState = editorState.getCurrentContent();
    const editorContainerRef = useRef<HTMLDivElement>(null);
    // Flags if container component has just been loaded, only changes to false when editor gets used
    const [appStart, setAppStart] = useState(true);
    const [savingStr, setSavingStr] = useState(false);
    const [currentTextColor, setCurrentTextColor] = useState('');
    const [currentHighlightColor, setCurrentHighlightColor] = useState('');

    const styleMap = {
        'STRIKETHROUGH': {
            textDecoration: 'line-through'
        },
        ...textColorMap,
        ...highlightColorMap
    };

    const inlineStyles = [
        { icon: 'B', type: 'BOLD', class: classes.BoldButton },
        { icon: 'I', type: 'ITALIC', class: classes.ItalicButton },
        { icon: 'U', type: 'UNDERLINE', class: classes.UnderlineButton },
        { icon: '-S-', type: 'STRIKETHROUGH', class: classes.StrikethroughButton },
        { icon: 'color', type: 'TEXTCOLOR', color: currentTextColor, hasMenu: true },
        { icon: 'highlight', type: 'HIGHLIGHT', color: currentHighlightColor, hasMenu: true }
    ];

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
    };

    const removeComponentLoadedState = () => {
        if (appStart) setAppStart(false);
    };

    return (
        <div>
            <NoteTitle id={id} saveTitle={saveTitle} />
            <EditorButtonContainer
                inlineStyles={inlineStyles}
                editorState={editorState}
                setEditorState={setEditorState}
                contentState={contentState}
                removeComponentLoadedState={removeComponentLoadedState}
                setCurrentTextColor={setCurrentTextColor}
                setCurrentHighlightColor={setCurrentHighlightColor}
            />
            <div ref={editorContainerRef} className={classes.EditorContainer}>
                <Editor
                    handleKeyCommand={handleKeyCommand}
                    customStyleMap={styleMap}
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
    const noteInfo = state.notes.filter((item: any) => item.id === ownProps.id)[0];
    return {
        content: noteInfo?.content
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        saveNote: (id: string, content: string) => dispatch({ type: 'SAVE_NOTE', id, content }),
        saveTitle: (id: string, title: string) => dispatch({ type: 'SAVE_TITLE', id, title })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);

import { useEffect, useRef, useState } from 'react';
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils } from 'draft-js';

import classes from './EditorContainer.module.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import colorData from '../../colors.json';
import fontSizes from '../../font-sizes.json';
import EditorButtonContainer from '../EditorButtonContainer/EditorButtonContainer';
import 'draft-js/dist/Draft.css';

interface PropTypes {
    id: string;
    saveNote: (id: string, content: string) => {};
    saveTitle: (id: string, title: string) => {};
    content: string;
}

const textColorMap: { [key: string]: {} } = {};
const highlightColorMap: { [key: string]: {} } = {};
const fontSizeMap: { [key: string]: {} } = {};

for (let item of colorData.basic) {
    textColorMap[`${item.name}-COLOR`] = { color: item.color };
    highlightColorMap[`${item.name}-HIGHLIGHT`] = { backgroundColor: item.color };
}

for (let item of fontSizes.sizes) {
    fontSizeMap[`${item}-FONTSIZE`] = { fontSize: item };
}

const EditorContainer = ({ id, saveNote, saveTitle, content }: PropTypes) => {
    const [editorState, setEditorState] = useState(content ? () => EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : () => EditorState.createEmpty());
    const contentState = editorState.getCurrentContent();
    const editorContainerRef = useRef<HTMLDivElement>(null);
    // Flags if container component has just been loaded, only changes to false when editor gets used
    const [appStart, setAppStart] = useState(true);
    const [savingStr, setSavingStr] = useState(false);

    const styleMap = {
        'STRIKETHROUGH': {
            textDecoration: 'line-through'
        },
        'SUPERSCRIPT': {
            fontSize: '.83em',
            verticalAlign: 'super'
        },
        'SUBSCRIPT': {
            fontSize: '.83em',
            verticalAlign: 'sub'
        },
        ...textColorMap,
        ...highlightColorMap,
        ...fontSizeMap
    };

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
            <EditorButtonContainer
                editorState={editorState}
                setEditorState={setEditorState}
                contentState={contentState}
                removeComponentLoadedState={removeComponentLoadedState}
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

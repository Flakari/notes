import { useEffect, useRef, useState } from 'react';
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils, getDefaultKeyBinding, Modifier } from 'draft-js';
import colorData from '../../colors.json';
import fontSizes from '../../font-sizes.json';
import EditorButtonContainer from '../EditorButtonContainer/EditorButtonContainer';
import 'draft-js/dist/Draft.css';

interface PropTypes {
    id: string;
    saveNote: (id: string, content: string) => void;
    content: string;
    editorButtonClass: string;
    editorClass: string;
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

const EditorContainer = ({ id, saveNote, content, editorButtonClass, editorClass }: PropTypes) => {
    const [editorState, setEditorState] = useState(content ? () => EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : () => EditorState.createEmpty());
    const contentState = editorState.getCurrentContent();
    const editorContainerRef = useRef<HTMLDivElement>(null);
    // Flags if container component has just been loaded, only changes to false when editor gets used
    const [appStart, setAppStart] = useState(true);
    const [savingStr, setSavingStr] = useState(false);
    const editorRef = useRef<Editor>(null);

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

    const keyBindingFn = (e: any) => {
        if (e.key === 'Tab') {
            const selection = editorState.getSelection();
            const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

            if (blockType === "unordered-list-item" || blockType === "ordered-list-item") {
                const newState = RichUtils.onTab(e, editorState, 4);
                setEditorState(newState);
            } else {
                const newState = Modifier.replaceText(editorState.getCurrentContent(), selection, '\t');
                setEditorState(EditorState.push(editorState, newState, 'insert-characters'));
            }

            return 'on-tab';
        }

        return getDefaultKeyBinding(e);
    };

    // Basic function to handle key commands
    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (command === 'on-tab') {
            return 'handled';
        }

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

    const focusEditor = () => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    return (
        <>
            <EditorButtonContainer
                editorState={editorState}
                setEditorState={setEditorState}
                contentState={contentState}
                removeComponentLoadedState={removeComponentLoadedState}
                editorButtonClass={editorButtonClass}
            />
            <div ref={editorContainerRef} className={editorClass} onClick={focusEditor}>
                <Editor
                    ref={editorRef}
                    handleKeyCommand={handleKeyCommand}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    onChange={setEditorState}
                    keyBindingFn={keyBindingFn}
                />
            </div>
        </>
    );
};

export default EditorContainer;

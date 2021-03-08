import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils } from 'draft-js';

import classes from './EditorContainer.module.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ColorContainer from '../ColorContainer/ColorContainer';

const inlineStyles = [
    { icon: 'B', type: 'BOLD', class: classes.BoldButton },
    { icon: 'I', type: 'ITALIC', class: classes.ItalicButton },
    { icon: 'U', type: 'UNDERLINE', class: classes.UnderlineButton },
    { icon: '-S-', type: 'STRIKETHROUGH', class: classes.StrikethroughButton },
    { icon: 'color', type: 'TEXTCOLOR', hasMenu: true },
    { icon: 'highlight', type: 'HIGHLIGHT', hasMenu: true }
];

interface PropTypes {
    id: string;
    saveNote: (id: string, content: string) => {};
    saveTitle: (id: string, title: string) => {};
    content: string;
    title: string;
}

const EditorContainer = ({ id, saveNote, saveTitle, content, title }: PropTypes) => {
    const [editorState, setEditorState] = useState(content ? () => EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : () => EditorState.createEmpty());
    const contentState = editorState.getCurrentContent();
    const editorContainerRef = useRef<HTMLDivElement>(null);
    // Flags if container component has just been loaded, only changes to false when editor gets used
    const [appStart, setAppStart] = useState(true);
    const [savingStr, setSavingStr] = useState(false);
    const [titleValue, setTitleValue] = useState(title || 'Untitled');
    const [textColor, setTextColor] = useState('black');
    const [showTextColor, setShowTextColor] = useState(false);
    const [highlightColor, setHighlightColor] = useState('none');
    const [showHighlightColor, setShowHighlightColor] = useState(false);

    const styleMap = {
        'STRIKETHROUGH': {
            textDecoration: 'line-through'
        },
        'TEXTCOLOR': {
            color: textColor
        },
        'HIGHLIGHT': {
            backgroundColor: highlightColor
        }
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
    };

    // Handles editor button commands for inline styles
    const onInlineStyleClick = (e: SyntheticEvent, command: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, command));
        if (appStart) {
            setAppStart(false);
        }
    };

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
        saveTitle(id, e.target.value);
    };

    const showButton = (type: string) => {
        if (type === 'TEXTCOLOR') {
            setShowTextColor(prevState => !prevState);
        } else {
            setShowHighlightColor(prevState => !prevState);
        }
    };

    const colorChange = (type: string, color: string) => {
        if (type === 'TEXTCOLOR') {
            setTextColor(color);
            setShowTextColor(false);
        } else {
            setHighlightColor(color);
            setShowHighlightColor(false);
        }
    };

    return (
        <div>
            <input id={classes.TitleInput} type="text" value={titleValue} onChange={titleChangeHandler} placeholder='Untitled' />
            <div className={classes.ButtonContainer}>
                {inlineStyles.map(style => {
                    const button = (
                        <button
                            key={style.type}
                            className={[classes.InlineButton, style.class].join(' ')}
                            onMouseDown={(e) => onInlineStyleClick(e, style.type)}
                        >{style.icon}</button>
                    );
                    if ('hasMenu' in style) {
                        let show;
                        if (style.type === 'TEXTCOLOR') {
                            show = showTextColor;
                        } else {
                            show = showHighlightColor;
                        }
                        return (
                            <div key={style.type}>
                                {button}
                                <button onMouseDown={() => showButton(style.type)} className={classes.InlineSubButton}><div></div></button>
                                {show ? <ColorContainer changeColor={colorChange} type={style.type} /> : null}
                            </div>
                        );
                    }
                    return button;
                })}
            </div>
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
        content: noteInfo?.content,
        title: noteInfo?.title
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        saveNote: (id: string, content: string) => dispatch({ type: 'SAVE_NOTE', id, content }),
        saveTitle: (id: string, title: string) => dispatch({ type: 'SAVE_TITLE', id, title })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);

import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils, Modifier } from 'draft-js';

import classes from './EditorContainer.module.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ColorContainer from '../ColorContainer/ColorContainer';
import colorData from '../../colors.json';

interface PropTypes {
    id: string;
    saveNote: (id: string, content: string) => {};
    saveTitle: (id: string, title: string) => {};
    content: string;
    title: string;
}

const textColorMap: { [key: string]: {} } = {};
const highlightColorMap: { [key: string]: {} } = {};

const textColorArr: string[] = [];
const highlightColorArr: string[] = [];

for (let item of colorData.basic) {
    textColorMap[`${item.name}-COLOR`] = { color: item.color };
    textColorArr.push(`${item.name}-COLOR`);
    highlightColorMap[`${item.name}-HIGHLIGHT`] = { backgroundColor: item.color };
    highlightColorArr.push(`${item.name}-HIGHLIGHT`);
}

const EditorContainer = ({ id, saveNote, saveTitle, content, title }: PropTypes) => {
    const [editorState, setEditorState] = useState(content ? () => EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : () => EditorState.createEmpty());
    const contentState = editorState.getCurrentContent();
    const editorContainerRef = useRef<HTMLDivElement>(null);
    // Flags if container component has just been loaded, only changes to false when editor gets used
    const [appStart, setAppStart] = useState(true);
    const [savingStr, setSavingStr] = useState(false);
    const [titleValue, setTitleValue] = useState(title || 'Untitled');
    const [currentTextColor, setCurrentTextColor] = useState('');
    const [showTextColor, setShowTextColor] = useState(false);
    const [currentHighlightColor, setCurrentHighlightColor] = useState('');

    const [showHighlightColor, setShowHighlightColor] = useState(false);

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

    // Removes all colors stylings based on current selection in editor
    const removeColorStyles = (type: string) => {
        let styles;
        if (type === 'TEXTCOLOR') {
            styles = textColorArr;
        } else {
            styles = highlightColorArr;
        }

        const contentWithoutStyles = styles.reduce(
            (newContentState, style) =>
                Modifier.removeInlineStyle(
                    newContentState,
                    editorState.getSelection(),
                    style
                ),
            contentState
        );

        return EditorState.push(
            editorState,
            contentWithoutStyles,
            'change-inline-style'
        );
    };

    const colorChange = (e: SyntheticEvent, type: string, color: string) => {
        e.preventDefault();
        if ((type === 'TEXTCOLOR' && color === 'black') || (type === 'HIGHLIGHT' && color === 'white')) {
            setEditorState(removeColorStyles(type));
        } else {
            const newStyle = Modifier.applyInlineStyle(
                removeColorStyles(type).getCurrentContent(),
                editorState.getSelection(),
                type === 'TEXTCOLOR' ? `${color}-COLOR` : `${color}-HIGHLIGHT`
            );
            setEditorState(EditorState.push(
                editorState,
                newStyle,
                'change-inline-style'
            ));
        }

        if (type === 'TEXTCOLOR') {
            setCurrentTextColor(`${color}-COLOR`);
            setShowTextColor(false);
        } else {
            setCurrentHighlightColor(`${color}-HIGHLIGHT`);
            setShowHighlightColor(false);
        }
        if (appStart) {
            setAppStart(false);
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
                            onMouseDown={(e) => onInlineStyleClick(e, 'color' in style ? style.color! : style.type)}
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
                                <button key={`${style.type}-SUB`} onMouseDown={() => showButton(style.type)} className={classes.InlineSubButton}><div></div></button>
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

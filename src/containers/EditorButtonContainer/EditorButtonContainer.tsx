import { useState, SyntheticEvent } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';

import ColorContainer from '../ColorContainer/ColorContainer';
import colorData from '../../colors.json';
import classes from './EditorButtonContainer.module.css';

interface PropTypes {
    inlineStyles: {
        icon: string,
        type: string,
        class?: string,
        color?: string,
        hasMenu?: boolean
    }[];
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
    contentState: any;
    removeComponentLoadedState: () => void;
    setCurrentTextColor: React.Dispatch<React.SetStateAction<string>>;
    setCurrentHighlightColor: React.Dispatch<React.SetStateAction<string>>;
}

const textColorArr: string[] = [];
const highlightColorArr: string[] = [];

for (let item of colorData.basic) {
    textColorArr.push(`${item.name}-COLOR`);
    highlightColorArr.push(`${item.name}-HIGHLIGHT`);
}

const EditorButtonContainer = (props: PropTypes) => {
    const [showTextColor, setShowTextColor] = useState(false);
    const [showHighlightColor, setShowHighlightColor] = useState(false);

    const showButton = (type: string) => {
        if (type === 'TEXTCOLOR') {
            setShowTextColor(prevState => !prevState);
        } else {
            setShowHighlightColor(prevState => !prevState);
        }
    };

    // Handles editor button commands for inline styles
    const onInlineStyleClick = (e: SyntheticEvent, command: string) => {
        e.preventDefault();
        props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, command));
        props.removeComponentLoadedState();
    };

    // Removes chosen inline stylings based on current selection in editor
    const removeInlineStyle = (styleArr: string[]) => {
        const contentWithoutStyles = styleArr.reduce(
            (newContentState, style) =>
                Modifier.removeInlineStyle(
                    newContentState,
                    props.editorState.getSelection(),
                    style
                ),
            props.contentState
        );

        return EditorState.push(
            props.editorState,
            contentWithoutStyles,
            'change-inline-style'
        );
    };

    // Overrides color or highlight styles, first removing appropriate style in range and inserting new
    const colorChange = (e: SyntheticEvent, type: string, color: string) => {
        e.preventDefault();
        const colorArr = type === 'TEXTCOLOR' ? textColorArr : highlightColorArr;
        if ((type === 'TEXTCOLOR' && color === 'black') || (type === 'HIGHLIGHT' && color === 'white')) {
            props.setEditorState(removeInlineStyle(colorArr));
        } else {
            const newStyle = Modifier.applyInlineStyle(
                removeInlineStyle(colorArr).getCurrentContent(),
                props.editorState.getSelection(),
                type === 'TEXTCOLOR' ? `${color}-COLOR` : `${color}-HIGHLIGHT`
            );
            props.setEditorState(EditorState.push(
                props.editorState,
                newStyle,
                'change-inline-style'
            ));
        }

        type === 'TEXTCOLOR' ? props.setCurrentTextColor(color) : props.setCurrentHighlightColor(color);
        props.removeComponentLoadedState();
    };

    // Overrides script inline styles if other is present, else it toggles whatever script is called
    const changeScriptAlignment = (e: SyntheticEvent, type: 'SUPERSCRIPT' | 'SUBSCRIPT') => {
        e.preventDefault();
        const opposite = type === 'SUPERSCRIPT' ? 'SUBSCRIPT' : 'SUPERSCRIPT';
        let newEditorState: EditorState = props.editorState;
        // If the opposite script inline style is present, toggle that first before toggling the other
        if (props.editorState.getCurrentInlineStyle().has(opposite)) {
            newEditorState = RichUtils.toggleInlineStyle(props.editorState, opposite);
        }
        props.setEditorState(RichUtils.toggleInlineStyle(newEditorState, type));
        props.removeComponentLoadedState();
    }

    return (
        <div className={classes.ButtonContainer}>
            {props.inlineStyles.map(style => {
                const button = (
                    <button
                        key={style.type}
                        className={[classes.InlineButton, `fas fa-${style.icon}`].join(' ')}
                        onMouseDown={(e) => 'color' in style ? colorChange(e, style.type, style.color!) :
                            style.type === 'SUPERSCRIPT' || style.type === 'SUBSCRIPT' ? changeScriptAlignment(e, style.type) :
                                onInlineStyleClick(e, style.type)}
                    ></button>
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
                            {show ? <ColorContainer type={style.type} changeColor={colorChange} showButton={showButton} /> : null}
                        </div>
                    );
                }
                return button;
            })}
        </div>
    );
};

export default EditorButtonContainer;

import { useState } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';

import colorData from '../../colors.json';
import fontSizes from '../../font-sizes.json';
import classes from './EditorButtonContainer.module.css';
import EditorButton from './EditorButton/EditorButton';
import EditorDropdown from './EditorDropdown/EditorDropdown';
import EditorCategory from './EditorCategory/EditorCategory';
import { Style as ButtonStyle } from './EdtiorButtonInformation/EditorButtonInfo';
import { CategoryLayout } from './EdtiorButtonInformation/EditorButtonLayouts';

interface PropTypes {
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
    contentState: any;
    removeComponentLoadedState: () => void;
    editorButtonClass: string;
    editorButtonSelection: (ButtonStyle | CategoryLayout)[];
}

const textColorArr: string[] = [];
const highlightColorArr: string[] = [];
const fontSizeArr = fontSizes.sizes.map(item => `${item}-FONTSIZE`);

for (let item of colorData.basic) {
    textColorArr.push(`${item.name}-TEXTCOLOR`);
    highlightColorArr.push(`${item.name}-HIGHLIGHT`);
}

const headers = [
    'header-one',
    'header-two',
    'header-three',
    'header-four',
    'header-five',
    'header-six'
];

const DEFAULT_TEXT_SIZE = 16;

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
    const onInlineStyleClick = (command: string) => {
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
    const colorChange = (type: string, color: string) => {
        const colorArr = type === 'TEXTCOLOR' ? textColorArr : highlightColorArr;
        if ((type === 'TEXTCOLOR' && color === 'black') || (type === 'HIGHLIGHT' && color === 'white')) {
            props.setEditorState(removeInlineStyle(colorArr));
        } else {
            const newStyle = Modifier.applyInlineStyle(
                removeInlineStyle(colorArr).getCurrentContent(),
                props.editorState.getSelection(),
                type === 'TEXTCOLOR' ? `${color}-TEXTCOLOR` : `${color}-HIGHLIGHT`
            );
            props.setEditorState(EditorState.push(
                props.editorState,
                newStyle,
                'change-inline-style'
            ));
        }

        props.removeComponentLoadedState();
    };

    const fontSizeChange = (size: number) => {
        if (size === DEFAULT_TEXT_SIZE) {
            props.setEditorState(removeInlineStyle(fontSizeArr));
        } else {
            const newStyle = Modifier.applyInlineStyle(
                removeInlineStyle(fontSizeArr).getCurrentContent(),
                props.editorState.getSelection(),
                `${size}-FONTSIZE`
            );
            props.setEditorState(EditorState.push(
                props.editorState,
                newStyle,
                'change-inline-style'
            ));
        }
        props.removeComponentLoadedState();
    };

    // Overrides script inline styles if other is present, else it toggles whatever script is called
    const changeScriptAlignment = (type: string) => {
        const opposite = type === 'SUPERSCRIPT' ? 'SUBSCRIPT' : 'SUPERSCRIPT';
        let newEditorState: EditorState = props.editorState;
        // If the opposite script inline style is present, toggle that first before toggling the other
        if (props.editorState.getCurrentInlineStyle().has(opposite)) {
            newEditorState = RichUtils.toggleInlineStyle(props.editorState, opposite);
        }
        props.setEditorState(RichUtils.toggleInlineStyle(newEditorState, type));
        props.removeComponentLoadedState();
    };

    const onBlockStyleClick = (command: string) => {
        props.setEditorState(RichUtils.toggleBlockType(props.editorState, command));
        props.removeComponentLoadedState();
    };

    const onUndo = () => {
        props.setEditorState(EditorState.undo(props.editorState));
    };

    const onRedo = () => {
        props.setEditorState(EditorState.redo(props.editorState));
    };

    const utilityButton = (btnStyle: ButtonStyle) => {
        return (
            <EditorButton
                key={btnStyle.name}
                type={btnStyle.name}
                icon={btnStyle.icon}
                fn={btnStyle.name === 'UNDO' ? onUndo : onRedo}
                editorState={props.editorState}
                styleType={btnStyle.type}
            />
        );
    };

    const inlineButton = (btnStyle: ButtonStyle) => {
        const fn = 'color' in btnStyle ? colorChange :
            btnStyle.name === 'SUPERSCRIPT' || btnStyle.name === 'SUBSCRIPT' ? changeScriptAlignment : onInlineStyleClick;
        const showValue = btnStyle.name === 'TEXTCOLOR' ? showTextColor : showHighlightColor;

        return (
            <EditorButton
                key={btnStyle.name}
                type={btnStyle.name}
                icon={btnStyle.icon}
                hasMenu={btnStyle.hasMenu}
                fn={fn}
                showValue={showValue}
                showButton={showButton}
                editorState={props.editorState}
                styleType='inline'
            />
        );
    };

    const selectStyle = (style: ButtonStyle) => {
        let fn, options, defaultValue;
        if (style.type === 'inline') {
            fn = fontSizeChange;
            options = fontSizes.sizes;
            defaultValue = DEFAULT_TEXT_SIZE.toString();
        } else {
            fn = onBlockStyleClick;
            options = headers;
            defaultValue = 'headerone'
        }

        return (
            <EditorDropdown
                key={style.name}
                options={options}
                fn={fn}
                type={style.name}
                default={defaultValue}
                editorState={props.editorState}
                styleType={style.type}
            />
        );
    };

    const blockButton = (style: ButtonStyle) => {
        return (
            <EditorButton
                key={style.name}
                type={style.name}
                icon={style.icon}
                fn={onBlockStyleClick}
                editorState={props.editorState}
                styleType='block'
            />
        );
    };

    const buttonStyles = (style: ButtonStyle) => {
        if (style.type === 'utility') return utilityButton(style);
        if (style.btnType === 'select') return selectStyle(style);
        if (style.type === 'inline') return inlineButton(style);
        return blockButton(style);
    }

    return (
        <div className={[classes.ButtonContainer, props.editorButtonClass].join(' ')}>
            {props.editorButtonSelection.map(style => {
                if ('categoryName' in style) {
                    return (
                        <EditorCategory name={style.categoryName} icon={style.icon}>
                            {style.contents.map(btnStyle => buttonStyles(btnStyle))}
                        </EditorCategory>
                    );
                } else {
                    return buttonStyles(style);
                }
            })}
        </div>
    );
};

export default EditorButtonContainer;

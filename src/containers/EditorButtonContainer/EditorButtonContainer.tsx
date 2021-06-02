import { useEffect, useState } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';

import colorData from '../../colors.json';
import fontSizes from '../../font-sizes.json';
import classes from './EditorButtonContainer.module.css';
import EditorButton from './EditorButton/EditorButton';
import EditorDropdown from './EditorDropdown/EditorDropdown';
import * as buttonLayouts from './EdtiorButtonInformation/EditorButtonLayouts';
import { Style as ButtonStyle } from './EdtiorButtonInformation/EditorButtonInfo';

interface PropTypes {
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
    contentState: any;
    removeComponentLoadedState: () => void;
    editorButtonClass: string;
    editorButtonSelection: 'basic' | 'full';
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
    const [inlineStyles, setInlineStyles] = useState<ButtonStyle[]>([]);
    const [selectStyles, setSelectStyles] = useState<ButtonStyle[]>([]);
    const [blockStyles, setBlockStyles] = useState<ButtonStyle[]>([]);
    const [utilityButtons, setUtilityButtons] = useState<ButtonStyle[]>([]);

    useEffect(() => {
        setUtilityButtons(buttonLayouts.utility);
        setInlineStyles(() => props.editorButtonSelection === 'basic' ? buttonLayouts.basicInlineLayout : buttonLayouts.fullInlineLayout);
        setSelectStyles(() => props.editorButtonSelection === 'full' ? buttonLayouts.selectLayout : []);
        setBlockStyles(() => props.editorButtonSelection === 'basic' ? buttonLayouts.basicBlockLayout : buttonLayouts.fullBlockLayout);
    }, [props.editorButtonSelection]);

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
                key={btnStyle.type}
                type={btnStyle.type}
                icon={btnStyle.icon}
                fn={btnStyle.name === 'UNDO' ? onUndo : onRedo}
                editorState={props.editorState}
                styleType={'inline'}
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

    return (
        <div className={[classes.ButtonContainer, props.editorButtonClass].join(' ')}>
            {utilityButtons.map(style => utilityButton(style))}
            {inlineStyles.map(style => inlineButton(style))}
            {selectStyles.map(style => {
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
            })}
            {blockStyles.map(style => {
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
            })}
        </div>
    );
};

export default EditorButtonContainer;

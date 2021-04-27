import { useEffect, useState } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';

import colorData from '../../colors.json';
import fontSizes from '../../font-sizes.json';
import classes from './EditorButtonContainer.module.css';
import EditorButton from './EditorButton/EditorButton';
import EditorDropdown from './EditorDropdown/EditorDropdown';

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

interface ButtonStyle {
    icon?: string;
    type: string;
    btnType?: string;
    color?: boolean;
    hasMenu?: boolean;
}

const EditorButtonContainer = (props: PropTypes) => {
    const [showTextColor, setShowTextColor] = useState(false);
    const [showHighlightColor, setShowHighlightColor] = useState(false);
    const [inlineStyles, setInlineStyles] = useState<ButtonStyle[]>([]);
    const [blockStyles, setBlockStyles] = useState<ButtonStyle[]>([]);

    useEffect(() => {
        const basicInlineStyles: ButtonStyle[] = [
            { icon: 'bold', type: 'BOLD', btnType: 'button' },
            { icon: 'italic', type: 'ITALIC', btnType: 'button' },
            { icon: 'underline', type: 'UNDERLINE', btnType: 'button' },
            { icon: 'strikethrough', type: 'STRIKETHROUGH', btnType: 'button' },
            { icon: 'superscript', type: 'SUPERSCRIPT', btnType: 'button' },
            { icon: 'subscript', type: 'SUBSCRIPT', btnType: 'button' },
        ];

        const basicBlockStyles: ButtonStyle[] = [
            { icon: 'list-ul', type: 'unordered-list-item', btnType: 'button' },
            { icon: 'list-ol', type: 'ordered-list-item', btnType: 'button' }
        ];

        const fullInlineStyles: ButtonStyle[] = [
            ...basicInlineStyles,
            { icon: 'font', type: 'TEXTCOLOR', btnType: 'button', color: true, hasMenu: true },
            { icon: 'highlighter', type: 'HIGHLIGHT', btnType: 'button', color: true, hasMenu: true },
            { btnType: 'select', type: 'FONTSIZE' }
        ];

        const fullBlockStyles: ButtonStyle[] = [
            { btnType: 'select', type: 'headers' },
            ...basicBlockStyles,
            { icon: 'quote-right', type: 'blockquote', btnType: 'button' },
            { icon: 'code', type: 'code-block', btnType: 'button' },
            { icon: 'remove-format', type: 'unstyled', btnType: 'button' },
        ];

        setInlineStyles(() => props.editorButtonSelection === 'basic' ? basicInlineStyles : fullInlineStyles);
        setBlockStyles(() => props.editorButtonSelection === 'basic' ? basicBlockStyles : fullBlockStyles);
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

    const inlineButton = (btnStyle: ButtonStyle) => {
        const fn = 'color' in btnStyle ? colorChange :
            btnStyle.type === 'SUPERSCRIPT' || btnStyle.type === 'SUBSCRIPT' ? changeScriptAlignment : onInlineStyleClick;
        const showValue = btnStyle.type === 'TEXTCOLOR' ? showTextColor : showHighlightColor;

        return (
            <EditorButton
                key={btnStyle.type}
                type={btnStyle.type}
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
            {inlineStyles.map(style => {
                return style.btnType === 'button' ?
                    inlineButton(style) : (
                        <EditorDropdown
                            key={style.type}
                            options={fontSizes.sizes}
                            fn={fontSizeChange}
                            type={style.type}
                            default='16'
                            editorState={props.editorState}
                            styleType='inline'
                        />
                    );
            })}
            {blockStyles.map(style => {
                return style.btnType === 'button' ? (
                    <EditorButton
                        key={style.type}
                        type={style.type}
                        icon={style.icon}
                        fn={onBlockStyleClick}
                        editorState={props.editorState}
                        styleType='block'
                    />
                ) : (
                    <EditorDropdown
                        key={style.type}
                        options={headers}
                        fn={onBlockStyleClick}
                        type={style.type}
                        default='headerone'
                        editorState={props.editorState}
                        styleType='block'
                    />
                );
            })}
        </div>
    );
};

export default EditorButtonContainer;

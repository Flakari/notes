import { useState } from 'react';
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
}

const textColorArr: string[] = [];
const highlightColorArr: string[] = [];
const fontSizeArr = fontSizes.sizes.map(item => `${item}-FONTSIZE`);

for (let item of colorData.basic) {
    textColorArr.push(`${item.name}-COLOR`);
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
    const [currentTextColor, setCurrentTextColor] = useState('black');
    const [currentHighlightColor, setCurrentHighlightColor] = useState('white');

    const inlineStyles = [
        { icon: 'bold', type: 'BOLD', btnType: 'button' },
        { icon: 'italic', type: 'ITALIC', btnType: 'button' },
        { icon: 'underline', type: 'UNDERLINE', btnType: 'button' },
        { icon: 'strikethrough', type: 'STRIKETHROUGH', btnType: 'button' },
        { icon: 'font', type: 'TEXTCOLOR', btnType: 'button', color: currentTextColor, hasMenu: true },
        { icon: 'highlighter', type: 'HIGHLIGHT', btnType: 'button', color: currentHighlightColor, hasMenu: true },
        { icon: 'superscript', type: 'SUPERSCRIPT', btnType: 'button' },
        { icon: 'subscript', type: 'SUBSCRIPT', btnType: 'button' },
        { btnType: 'select', type: 'FONTSIZE' }
    ];

    const blockStyles = [
        { btnType: 'select', type: 'headers' },
        { icon: 'list-ul', type: 'unordered-list-item', btnType: 'button' },
        { icon: 'list-ol', type: 'ordered-list-item', btnType: 'button' },
        { icon: 'quote-right', type: 'blockquote', btnType: 'button' },
        { icon: 'code', type: 'code-block', btnType: 'button' },
        { icon: 'remove-format', type: 'unstyled', btnType: 'button' },
    ];

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
                type === 'TEXTCOLOR' ? `${color}-COLOR` : `${color}-HIGHLIGHT`
            );
            props.setEditorState(EditorState.push(
                props.editorState,
                newStyle,
                'change-inline-style'
            ));
        }

        type === 'TEXTCOLOR' ? setCurrentTextColor(color) : setCurrentHighlightColor(color);
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

    return (
        <div className={[classes.ButtonContainer, props.editorButtonClass].join(' ')}>
            {inlineStyles.map(style => {
                const fn = 'color' in style ? colorChange :
                    style.type === 'SUPERSCRIPT' || style.type === 'SUBSCRIPT' ? changeScriptAlignment : onInlineStyleClick;
                const showValue = style.type === 'TEXTCOLOR' ? showTextColor : showHighlightColor;
                let button;
                if (style.btnType === 'button') {
                    button = <EditorButton
                        key={style.type}
                        type={style.type}
                        icon={style.icon}
                        hasMenu={style.hasMenu}
                        fn={fn}
                        showValue={showValue}
                        showButton={showButton}
                    />;
                }

                if (style.btnType === 'select') {
                    button = <EditorDropdown
                        key={style.type}
                        options={fontSizes.sizes}
                        fn={fontSizeChange}
                        type={style.type}
                        default='16'
                    />;
                }

                return button;
            })}
            {blockStyles.map(style => {
                let button;

                if (style.btnType === 'button') {
                    button = <EditorButton
                        key={style.type}
                        type={style.type}
                        icon={style.icon}
                        fn={onBlockStyleClick}
                    />;
                }

                if (style.btnType === 'select') {
                    button = <EditorDropdown
                        key={style.type}
                        options={headers}
                        fn={onBlockStyleClick}
                        type={style.type}
                        default='headerone'
                    />;
                }

                return button;
            })}
        </div>
    );
};

export default EditorButtonContainer;

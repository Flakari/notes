import { SyntheticEvent, useEffect, useState } from 'react';
import { EditorState } from 'draft-js';

import ColorContainer from '../../ColorContainer/ColorContainer';
import classes from './EditorButton.module.css';

interface PropTypes {
    type: string;
    icon: string | undefined;
    color?: string;
    hasMenu?: boolean;
    fn: any;
    showValue?: boolean;
    showButton?: (type: string) => void;
    editorState: EditorState;
    styleType: string;
}

const EditorButton = (props: PropTypes) => {
    const [active, setActive] = useState(false);
    const [selection, setSelection] = useState(props.editorState.getSelection());

    useEffect(() => {
        if (props.styleType === 'inline') {
            setActive(props.editorState.getCurrentInlineStyle().has(props.type));
        }

        if (props.styleType === 'block' && props.type !== 'unstyled') {
            setActive(props.editorState.getCurrentContent().getBlockForKey(selection.getAnchorKey()) && props.editorState.getCurrentContent().getBlockForKey(selection.getAnchorKey()).getType() === props.type)
        }
    }, [props.editorState, props.type, selection, props.styleType]);

    useEffect(() => {
        setSelection(props.editorState.getSelection());
    }, [props.editorState]);

    const clickHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        props.fn(props.type);
    };

    let button = (
        <button
            className={[classes.InlineButton, `fas fa-${props.icon}`, active ? classes.active : null].join(' ')}
            onMouseDown={clickHandler}
            aria-label={props.type.toLowerCase()}
        ></button>
    );

    if (props.hasMenu) {
        button = (
            <div className={classes.ButtonWithMenuContainer}>
                {button}
                <button
                    onMouseDown={() => props.showButton!(props.type)}
                    className={classes.InlineSubButton}
                    aria-label='Dropdown'
                ><div></div></button>
                {props.showValue ? <ColorContainer type={props.type} changeColor={props.fn} showButton={props.showButton!} /> : null}
            </div>
        );
    }

    return button;
};

export default EditorButton;

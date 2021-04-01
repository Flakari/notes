import { SyntheticEvent, useEffect, useState } from 'react';
import { EditorState } from 'draft-js';

import ColorContainer from '../../ColorContainer/ColorContainer';
import classes from './EditorButton.module.css';
import data from '../../../colors.json';

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
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (props.styleType === 'inline') {
            setActive(props.editorState.getCurrentInlineStyle().has(props.type));

            if (props.hasMenu) {
                for (let color of data.basic) {
                    if (props.editorState.getCurrentInlineStyle().has(`${color.name}-${props.type}`)) {
                        setStyle({ color: color.color });
                        return;
                    } else {
                        setStyle({});
                    }
                }
            }
        }

        if (props.styleType === 'block' && props.type !== 'unstyled') {
            const anchorKey = props.editorState.getCurrentContent().getBlockForKey(selection.getAnchorKey());
            setActive(anchorKey && anchorKey.getType() === props.type);
        }
    }, [props.editorState, props.type, selection, props.styleType, props.hasMenu]);

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
            style={style}
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

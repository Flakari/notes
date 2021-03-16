import { SyntheticEvent } from 'react';

import ColorContainer from '../../ColorContainer/ColorContainer';
import classes from '../EditorButtonContainer.module.css';

interface PropTypes {
    type: string;
    icon: string | undefined;
    color?: string;
    hasMenu?: boolean;
    fn: any;
    showValue?: boolean;
    showButton?: (type: string) => void;
}

const EditorButton = (props: PropTypes) => {
    const clickHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        props.fn(props.type);
    };

    let button = (
        <button
            className={[classes.InlineButton, `fas fa-${props.icon}`].join(' ')}
            onMouseDown={clickHandler}
            aria-label={props.type.toLowerCase()}
        ></button>
    );

    if (props.hasMenu) {
        button = (
            <div>
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

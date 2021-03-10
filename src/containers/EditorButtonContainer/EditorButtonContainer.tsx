import { useState, SyntheticEvent } from 'react';

import ColorContainer from '../ColorContainer/ColorContainer';
import classes from './EditorButtonContainer.module.css';

interface PropTypes {
    inlineStyles: {
        icon: string,
        type: string,
        class?: string,
        color?: string,
        hasMenu?: boolean
    }[];
    colorChange: (e: SyntheticEvent, type: string, color: string) => void;
    onInlineStyleClick: (e: SyntheticEvent, command: string) => void;
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

    return (
        <div className={classes.ButtonContainer}>
            {props.inlineStyles.map(style => {
                const button = (
                    <button
                        key={style.type}
                        className={[classes.InlineButton, style.class].join(' ')}
                        onMouseDown={(e) => 'color' in style ? props.colorChange(e, style.type, style.color!) : props.onInlineStyleClick(e, style.type)}
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
                            {show ? <ColorContainer type={style.type} changeColor={props.colorChange} showButton={showButton} /> : null}
                        </div>
                    );
                }
                return button;
            })}
        </div>
    );
};

export default EditorButtonContainer;

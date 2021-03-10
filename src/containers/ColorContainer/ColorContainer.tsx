import classes from './ColorContainer.module.css';
import data from '../../colors.json';
import { SyntheticEvent } from 'react';

interface PropTyes {
    type: string;
    changeColor: (e: SyntheticEvent, type: string, color: string) => void;
    showButton: (type: string) => void
}

const ColorContainer = (props: PropTyes) => {
    const clickHandler = (e: SyntheticEvent, name: string) => {
        props.changeColor(e, props.type, name);
        props.showButton(props.type);
    };

    return (
        <div className={classes.ColorContainer}>
            <ul>
                {data.basic.map(item => {
                    return (
                        <li
                            key={item.name}
                            onClick={(e) => clickHandler(e, item.name)}
                        >
                            <div style={{ background: item.color }}></div>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ColorContainer;

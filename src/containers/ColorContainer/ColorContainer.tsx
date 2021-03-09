import classes from './ColorContainer.module.css';
import data from '../../colors.json';
import { SyntheticEvent } from 'react';

interface PropTyes {
    type: string;
    changeColor: (e: SyntheticEvent, type: string, color: string) => void
}

const ColorContainer = (props: PropTyes) => (
    <div className={classes.ColorContainer}>
        <ul>
            {data.basic.map(item => {
                return (
                    <li
                        key={item.name}
                        onClick={(e) => props.changeColor(e, props.type, item.name)}
                    >
                        <div style={{ background: item.color }}></div>
                        {item.name}
                    </li>
                );
            })}
        </ul>
    </div>
);

export default ColorContainer;

import classes from './ColorContainer.module.css';
import data from '../../colors.json';

interface PropTyes {
    type: string;
    changeColor: (type: string, color: string) => void
}

const ColorContainer = (props: PropTyes) => (
    <div className={classes.ColorContainer}>
        <ul>
            {data.basic.map(item => {
                return (
                    <li key={item.name} onClick={() => props.changeColor(props.type, item.color)}><div style={{ background: item.color }}></div>{item.name}</li>
                );
            })}
        </ul>
    </div>
);

export default ColorContainer;

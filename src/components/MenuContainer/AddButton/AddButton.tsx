import { useDispatch } from "react-redux";
import classes from './AddButton.module.css';

interface PropTypes {
    type: 'Page' | 'Board';
}

const AddButton = (props: PropTypes) => {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch({ type: `CREATE_${props.type.toUpperCase()}` });
    }

    return <button className={classes.AddButton} onClick={clickHandler}>Create {props.type}</button>
}

export default AddButton;

import classes from "./NoteMenuItem.module.css";

interface PropTypes {
    children: string;
    clickFunction?: () => void;
}

const NoteMenuItem = (props: PropTypes) => {
    return <button onClick={props.clickFunction} className={classes.NoteMenuItem}>{props.children}</button>
};

export default NoteMenuItem;

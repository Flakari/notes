import { SyntheticEvent } from "react";
import classes from "./NoteMenuItem.module.css";

interface PropTypes {
    children: string;
    clickFunction?: (e: SyntheticEvent) => void;
}

const NoteMenuItem = (props: PropTypes) => {
    return <button onClick={props.clickFunction} className={classes.NoteMenuItem}>{props.children}</button>
};

export default NoteMenuItem;

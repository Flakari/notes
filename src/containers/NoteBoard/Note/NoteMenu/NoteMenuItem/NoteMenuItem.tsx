import { SyntheticEvent } from 'react';
import classes from "./NoteMenuItem.module.css";

interface PropTypes {
    children: any;
    clickFunction: (e: SyntheticEvent) => void;
    subMenuItem?: boolean;
    addedClasses?: string[];
}

const NoteMenuItem = (props: PropTypes) => {
    return (
        <button
            onClick={props.clickFunction}
            className={
                [
                    classes.NoteMenuItem,
                    props.subMenuItem && classes.NoteSubMenuItem,
                    props.addedClasses ? props.addedClasses!.map(item => classes[item]).join(' ') : null
                ].join(' ')
            }
        >
            {props.children}
        </button>
    );
};

export default NoteMenuItem;

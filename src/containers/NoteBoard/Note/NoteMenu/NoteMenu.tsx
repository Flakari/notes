import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';

import classes from './NoteMenu.module.css';
import NoteMenuItem from './NoteMenuItem/NoteMenuItem';

interface PropTypes {
    id: string;
}

const NoteMenu = (props: PropTypes) => {
    const dispatch = useDispatch();

    // Change Note color function

    // Lock function, prevent note from moving and/or being deleted

    const deleteNote = (e: SyntheticEvent) => {
        dispatch({ type: 'DELETE_NOTE', id: props.id });
        e.stopPropagation();
    };

    return (
        <div className={classes.NoteMenu}>
            <NoteMenuItem>Change Note Color</NoteMenuItem>
            <NoteMenuItem>Lock</NoteMenuItem>
            <NoteMenuItem clickFunction={deleteNote}>Delete</NoteMenuItem>
        </div>

    );
};

export default NoteMenu;

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from './NoteMenu.module.css';
import NoteMenuItem from './NoteMenuItem/NoteMenuItem';

const noteColors = [
    { name: 'Original', color: '' },
    { name: 'Blue', color: 'blue' },
    { name: 'Green', color: 'green' },
    { name: 'Pink', color: 'pink' }
];

interface PropTypes {
    id: string;
    hideMenu: () => void;
}

const NoteMenu = (props: PropTypes) => {
    const dispatch = useDispatch();
    const [showColorMenu, setShowColorMenu] = useState(false);

    // Change Note color function
    const changeNoteColor = (color: string) => {
        dispatch({ type: 'CHANGE_NOTE_COLOR', noteId: props.id, color });
    };

    const toggleColorMenu = () => {
        setShowColorMenu(prevState => !prevState);
    };

    // Lock function, prevent note from moving and/or being deleted

    const deleteNote = () => {
        dispatch({ type: 'DELETE_NOTE', id: props.id });
    };

    return (
        <div className={classes.NoteMenu}>
            <NoteMenuItem clickFunction={toggleColorMenu}>Change Note Color</NoteMenuItem>
            {showColorMenu ? <div className={classes.NoteSubMenu}>
                {noteColors.map(item => (
                    <NoteMenuItem key={item.name} clickFunction={() => changeNoteColor(item.color)}>
                        {item.name}
                    </NoteMenuItem>
                ))}
            </div> : null}
            <NoteMenuItem>Lock</NoteMenuItem>
            <NoteMenuItem clickFunction={deleteNote}>Delete</NoteMenuItem>
        </div>

    );
};

export default NoteMenu;

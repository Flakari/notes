import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NoteMenu.module.css';
import NoteMenuItem from './NoteMenuItem/NoteMenuItem';
import State from '../../../../store/combinedState';

const noteColors = [
    { name: 'Original', color: '' },
    { name: 'Blue', color: 'blue' },
    { name: 'Green', color: 'green' },
    { name: 'Pink', color: 'pink' }
];

type LockTypes = 'editor' | 'position' | 'delete';

const lockTypes: LockTypes[] = ['editor', 'position', 'delete'];

interface PropTypes {
    id: string;
    hideMenu: () => void;
}

const NoteMenu = (props: PropTypes) => {
    const dispatch = useDispatch();
    const locks = useSelector((state: State) => state.board.boards[state.board.currentBoardId].notes[props.id].locks);
    const [showColorMenu, setShowColorMenu] = useState(false);
    const [showLockMenu, setShowLockMenu] = useState(false);

    // Change Note color function
    const changeNoteColor = (color: string) => {
        dispatch({ type: 'CHANGE_NOTE_COLOR', noteId: props.id, color });
    };

    const toggleColorMenu = () => {
        setShowColorMenu(prevState => !prevState);
    };

    // Lock function, prevent note from moving and/or being deleted
    const lockToggle = (lockType: string) => {
        dispatch({ type: 'TOGGLE_NOTE_LOCK', noteId: props.id, lockType });
    }

    const toggleLockMenu = () => {
        setShowLockMenu(prevState => !prevState);
    };

    const deleteNote = () => {
        if (locks.delete) return;
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
            <NoteMenuItem clickFunction={toggleLockMenu}>Lock</NoteMenuItem>
            {showLockMenu ? <div className={classes.NoteSubMenu}>
                {lockTypes.map(item => (
                    <NoteMenuItem key={item} clickFunction={() => lockToggle(item)}>
                        {locks[item] ? <div className={classes.LockMenuItem}><div className="fas fa-lock"></div><p>{item}</p></div> : item}
                    </NoteMenuItem>
                ))}
            </div> : null}
            <NoteMenuItem clickFunction={deleteNote}>Delete</NoteMenuItem>
        </div>

    );
};

export default NoteMenu;

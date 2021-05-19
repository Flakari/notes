import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NoteMenu.module.css';
import NoteMenuItem from './NoteMenuItem/NoteMenuItem';
import State from '../../../../store/combinedState';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClickEffects = (e: SyntheticEvent) => {
        e.stopPropagation();
        setShowDeleteModal(false);
    }

    // Change Note color function
    const changeNoteColor = (color: string, e: SyntheticEvent) => {
        handleClickEffects(e);
        dispatch({ type: 'CHANGE_NOTE_COLOR', noteId: props.id, color });
    };

    const toggleColorMenu = (e: SyntheticEvent) => {
        handleClickEffects(e);
        setShowColorMenu(prevState => !prevState);
    };

    // Lock function, prevent note from moving and/or being deleted
    const lockToggle = (lockType: string, e: SyntheticEvent) => {
        handleClickEffects(e);
        dispatch({ type: 'TOGGLE_NOTE_LOCK', noteId: props.id, lockType });
    };

    const toggleLockMenu = (e: SyntheticEvent) => {
        handleClickEffects(e);
        setShowLockMenu(prevState => !prevState);
    };

    const deleteNoteCheck = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (locks.delete) return;
        setShowDeleteModal(prevState => !prevState);
    };

    const cancelDeletion = (e: SyntheticEvent) => {
        e.stopPropagation();
        setShowDeleteModal(false);
    };

    const confirmDeletion = () => {
        dispatch({ type: 'DELETE_NOTE', id: props.id });
    };

    return (
        <div className={classes.NoteMenu}>
            <NoteMenuItem clickFunction={toggleColorMenu}>Change Note Color</NoteMenuItem>
            {showColorMenu ? <div className={classes.NoteSubMenu}>
                {noteColors.map(item => (
                    <NoteMenuItem key={item.name} clickFunction={(e) => changeNoteColor(item.color, e)} subMenuItem>
                        {item.name}
                    </NoteMenuItem>
                ))}
            </div> : null}
            <NoteMenuItem clickFunction={toggleLockMenu}>Lock</NoteMenuItem>
            {showLockMenu ? <div className={classes.NoteSubMenu}>
                {lockTypes.map(item => (
                    <NoteMenuItem key={item} clickFunction={(e) => lockToggle(item, e)} subMenuItem>
                        {locks[item] ? <div className={classes.LockMenuItem}><div className="fas fa-lock"></div><p>{item}</p></div> : item}
                    </NoteMenuItem>
                ))}
            </div> : null}
            <NoteMenuItem clickFunction={deleteNoteCheck} addedClasses={['delete', locks.delete ? 'disabled' : '']}>Delete</NoteMenuItem>
            {showDeleteModal ? (
                <ConfirmationModal
                    modalClass={classes.DeleteModal}
                    bodyFunction={(e) => e.stopPropagation()}
                    confirmFunction={confirmDeletion}
                    cancelFunction={cancelDeletion}
                >
                    Confirm Note Deletion?
                </ConfirmationModal>
            ) : null}
        </div>

    );
};

export default NoteMenu;

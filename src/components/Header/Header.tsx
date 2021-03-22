import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';

import NoteTitle from '../../containers/NoteTitle/NoteTitle'

export const Header = () => {
    const currentNoteId = useSelector((state: any) => state.note.currentNoteId);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch({ type: 'CREATE_NOTE' });
    };

    return (
        <header id={classes.MainHeader}>
            <div id={classes.TitleContainer}>
                {currentNoteId !== '' ? <NoteTitle key={currentNoteId} /> : <p>Notes</p>}
            </div>
            <button id={classes.CreateNote} onClick={clickHandler}>Create Note</button>
        </header>
    );
};

export default Header;

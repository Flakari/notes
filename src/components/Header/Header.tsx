import classes from './Header.module.css';
import { State } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';

import NoteTitle from '../../containers/NoteTitle/NoteTitle'

export const Header = () => {
    const currentNoteId = useSelector((state: State) => state.currentNoteId);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch({ type: 'CREATE_NOTE' });
    };

    return (
        <header id={classes.MainHeader}>
            {currentNoteId !== '' ? <NoteTitle key={currentNoteId} /> : <p>Notes</p>}
            <button id={classes.CreateNote} onClick={clickHandler}>Create Note</button>
        </header>
    );
};

export default Header;

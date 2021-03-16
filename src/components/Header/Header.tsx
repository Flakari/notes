import classes from './Header.module.css';
import { State } from '../../store/reducer';
import { useSelector } from 'react-redux';

import NoteTitle from '../../containers/NoteTitle/NoteTitle'
import NotesContainer from '../NotesContainer/NotesContainer';

export const Header = () => {
    const currentNoteId = useSelector((state: State) => state.currentNoteId);

    return (
        <header id={classes.MainHeader}>
            {currentNoteId !== '' ? <NoteTitle /> : <p>Notes</p>}
            <NotesContainer />
        </header>
    );
};

export default Header;

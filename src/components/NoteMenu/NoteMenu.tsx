import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Note } from '../../store/reducer';
import classes from './NoteMenu.module.css';

interface PropTypes {
    props: { containerToggle: () => void };
    showNote: (id: string) => {};
    deleteNote: (id: string) => {};
    notes: Note[];
    currentNoteId: string;
}

const NotesContainer = (props: PropTypes) => {
    const itemClickHandler = (id: string) => {
        props.showNote(id);
        props.props.containerToggle();
    };

    return (
        <div className={classes.NoteMenu}>
            <ul>
                {props.notes.filter(item => item.id !== props.currentNoteId).map(item => {
                    return (
                        <li key={item.id}>
                            <span onClick={() => itemClickHandler(item.id)}>{item.title || 'Untitled'}</span>
                            <button className={classes.btn} onClick={() => props.deleteNote(item.id)}>X</button>
                        </li>
                    );
                })}
            </ul>
        </div>

    );
};

const mapStateToProps = (state: any) => {
    return {
        notes: state.notes,
        currentNoteId: state.currentNoteId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        showNote: (id: string) => dispatch({ type: 'SHOW_NOTE', id }),
        deleteNote: (id: string) => dispatch({ type: 'DELETE_NOTE', id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Note } from '../../store/reducer';
import classes from './NotesContainer.module.css';

interface PropTypes {
    addNote: () => {};
    showNote: (id: string) => {};
    deleteNote: (id: string) => {};
    notes: Note[];
}

const NotesContainer = (props: PropTypes) => {
    return (
        <div>
            <button onClick={props.addNote}>Create Note</button>
            <div>
                <ul>
                    {props.notes.map(item => {
                        return (
                            <li key={item.id}>
                                <span onClick={() => props.showNote(item.id)}>{item.title || 'Untitled'}</span>
                                <button className={classes.btn} onClick={() => props.deleteNote(item.id)}>X</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        notes: state.notes
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNote: () => dispatch({ type: 'CREATE_NOTE' }),
        showNote: (id: string) => dispatch({ type: 'SHOW_NOTE', id }),
        deleteNote: (id: string) => dispatch({ type: 'DELETE_NOTE', id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);

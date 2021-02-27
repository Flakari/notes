import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Note } from '../../store/reducer';

interface PropTypes {
    addNote: () => {};
    showNote: (id: string) => {};
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
                            <li key={item.id} onClick={() => props.showNote(item.id)}>{item.title || 'Untitled'}</li>
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
        showNote: (id: string) => dispatch({ type: 'SHOW_NOTE', id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);

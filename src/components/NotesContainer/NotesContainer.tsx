import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Note } from '../../store/reducer';

interface PropTypes {
    addNote: () => {},
    notes: Note[]
}

const NotesContainer = (props: PropTypes) => {
    return (
        <div>
            <button onClick={props.addNote}>Create Note</button>
            <div>
                <ul>
                    {props.notes.map(item => <li key={item.id}>{item.title || 'Untitled'}</li>)}
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
        addNote: () => dispatch({ type: 'CREATE_NOTE' })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);

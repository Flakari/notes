import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Note } from '../../store/reducer';
import classes from './NotesContainer.module.css';

interface PropTypes {
    showNote: (id: string) => {};
    deleteNote: (id: string) => {};
    notes: Note[];
    currentNoteId: string;
}

const NotesContainer = (props: PropTypes) => {
    const [showFull, setShowFull] = useState(false);

    const containerToggle = () => {
        setShowFull(prevState => !prevState);
    };

    const itemClickHandler = (id: string) => {
        props.showNote(id);
        containerToggle();
    };

    return (
        <div>
            <button onClick={containerToggle}>Expand Container</button>
            <div className={[classes.noteContainer, showFull ? classes.expanded : classes.collapsed].join(' ')}>
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

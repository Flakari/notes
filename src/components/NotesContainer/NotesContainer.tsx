import React, { useEffect, useState } from 'react';
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
    const [hideContainer, setHideContainer] = useState(true);
    const [transitionStyle, setTransitionStyle] = useState({
        transform: 'translateY(0)'
    });

    useEffect(() => {
        if (showFull) {
            setHideContainer(false);
            setTimeout(() => {
                setTransitionStyle({
                    transform: 'translateY(300px)'
                });
            }, 10);
        } else {
            setTransitionStyle({
                transform: 'translateY(0)'
            });
        }
    }, [showFull]);

    const transitionHandler = () => {
        if (!showFull) setHideContainer(true);
    };

    const containerToggle = () => {
        setShowFull(prevState => !prevState);
    };

    const itemClickHandler = (id: string) => {
        props.showNote(id);
        containerToggle();
    };

    return (
        <div id={classes.MenuContainer}>
            {!hideContainer ? <div style={transitionStyle} onTransitionEnd={transitionHandler} className={classes.NoteContainer}>
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
            </div> : null}
            <div id={classes.MenuToggle} className={showFull ? classes.expanded : classes.collapsed} onClick={containerToggle} aria-label={!showFull ? 'Expand Menu' : 'Collapse Menu'}></div>
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

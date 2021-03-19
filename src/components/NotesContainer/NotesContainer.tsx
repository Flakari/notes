import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Transition } from 'react-transition-group';

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
    const containerRef = useRef(null);

    const duration = 500;

    const transitionStyles: { [id: string]: React.CSSProperties } = {
        entering: { transform: 'translateY(300px)' },
        entered: { transform: 'translateY(300px)' },
        exited: { visibility: 'hidden' }
    };

    const defaultStyle = {
        transition: `transform ${duration} ease-in`,
        transform: 'translateY(0)'
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
            <Transition in={showFull} timeout={duration} nodeRef={containerRef}>
                {(state) => <div style={{ ...defaultStyle, ...transitionStyles[state] }} className={classes.NoteContainer} ref={containerRef}>
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
                </div>}
            </Transition>
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

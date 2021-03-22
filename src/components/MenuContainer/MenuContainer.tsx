import { useState, useRef } from 'react';
import { Transition } from 'react-transition-group';

import NoteMenu from '../NoteMenu/NoteMenu';
import BoardMenu from '../BoardMenu/BoardMenu';
import classes from './MenuContainer.module.css';

const MenuContainer = () => {
    const [showNotesMenu, setShowNotesMenu] = useState(true);
    const [showFull, setShowFull] = useState(false);

    const showNotes = () => {
        setShowNotesMenu(true);
    };

    const showBoard = () => {
        setShowNotesMenu(false);
    };

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

    const props = {
        containerToggle
    };

    return (
        <>
            <Transition in={showFull} timeout={duration} nodeRef={containerRef}>
                {(state) => (
                    <div style={{ ...defaultStyle, ...transitionStyles[state] }} id={classes.MenuContainer} ref={containerRef}>
                        <div id={classes.MenuButtonContainer}>
                            <button onClick={showNotes}>Notes</button>
                            <button onClick={showBoard}>Board</button>
                        </div>
                        {showNotesMenu ? <NoteMenu props={props} /> : <BoardMenu props={props} />}
                    </div>
                )}
            </Transition>
            <div id={classes.MenuToggle} className={showFull ? classes.expanded : classes.collapsed} onClick={containerToggle} aria-label={!showFull ? 'Expand Menu' : 'Collapse Menu'}></div>
        </>

    );
};

export default MenuContainer;
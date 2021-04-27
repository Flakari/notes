import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NoteBoard.module.css';
import Note from './Note/Note';

import State from '../../store/combinedState';

interface PropTypes {
    id: string
}

const NoteBoard = (props: PropTypes) => {
    const [dragging, setDragging] = useState(false);
    const zIndex = useSelector((state: State) => state.board.boards[props.id].maxZIndex);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight - 105);
    const [style, setStyle] = useState({ width: width, height: height });
    const dispatch = useDispatch();
    const notes = useSelector((state: State) => state.board.boards[props.id].notes);
    const keys = useSelector(() => Object.keys(notes));
    const [noteFocus, setNoteFocus] = useState({ id: '', inFocus: false });

    const setDraggingState = (value: boolean) => {
        setDragging(value);
    };

    useEffect(() => {
        setStyle({ height, width });
    }, [height, width]);

    const addNote = () => {
        dispatch({ type: 'CREATE_NOTE' });
        dispatch({ type: 'UPDATE_BOARD_ZINDEX', zIndex: zIndex + 1 });
    }

    return (
        <div id={classes.NoteBoard} style={style} onClick={() => setNoteFocus({ id: '', inFocus: false })}>
            {keys.map(item => {
                return (
                    <Note
                        key={notes[item].id}
                        id={notes[item].id}
                        left={notes[item].left}
                        top={notes[item].top}
                        dragging={dragging}
                        setDraggingState={setDraggingState}
                        zIndex={zIndex}
                        containerWidth={width}
                        setContainerWidth={setWidth}
                        containerHeight={height}
                        setContainerHeight={setHeight}
                        noteFocus={noteFocus}
                        setNoteFocus={setNoteFocus}
                    />
                );
            })}
            <button id={classes.AddButton} onClick={addNote} aria-label='Add Note'>+</button>
        </div>
    );
};

export default NoteBoard;

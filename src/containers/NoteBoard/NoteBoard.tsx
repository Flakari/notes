import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NoteBoard.module.css';
import Note from './Note/Note';

import State from '../../store/combinedState';

interface PropTypes {
    id: string
}

const NoteBoard = (props: PropTypes) => {
    const [dragging, setDragging] = useState(false);
    const [zIndex, setZIndex] = useState(1);
    const [width, setWidth] = useState(window.innerWidth - 1);
    const [height, setHeight] = useState(window.innerHeight - 105);
    const [style, setStyle] = useState({ width: width, height: height });
    const dispatch = useDispatch();
    const notes = useSelector((state: State) => state.board.boards[props.id].notes);
    const keys = useSelector(() => Object.keys(notes));
    const [noteFocus, setNoteFocus] = useState({ id: '', inFocus: false });

    const setDraggingState = (value: boolean) => {
        setDragging(value);
    };

    const setZIndexState = () => {
        setZIndex(zIndex => zIndex + 1);
    };

    const setWidthState = (amount: number) => {
        setWidth(amount);
        setStyle({ ...style, width: amount });
    };

    const setHeightState = (amount: number) => {
        setHeight(amount);
        setStyle({ ...style, height: amount });
    };

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
                        setZIndex={setZIndexState}
                        containerWidth={width}
                        setContainerWidth={setWidthState}
                        containerHeight={height}
                        setContainerHeight={setHeightState}
                        noteFocus={noteFocus}
                        setNoteFocus={setNoteFocus}
                    />
                );
            })}
            <button id={classes.AddButton} onClick={() => dispatch({ type: 'CREATE_NOTE', boardId: props.id })} aria-label='Add Note'>+</button>
        </div>
    );
};

export default NoteBoard;

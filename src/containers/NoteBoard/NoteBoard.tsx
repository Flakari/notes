import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NoteBoard.module.css';
import Note from './Note/Note';

import State from '../../store/combinedState';

interface PropTypes {
    id: string;
}

type BoardDimensions = {
    height: number | string;
    width: number | string;
}

const NoteBoard = (props: PropTypes) => {
    const { maxZIndex, width, height, notes } = useSelector((state: State) => state.board.boards[props.id]);
    const [style, setStyle] = useState<BoardDimensions>({ width: width, height: height });
    const dispatch = useDispatch();
    const [noteFocus, setNoteFocus] = useState({ id: '', inFocus: false });
    const boardRef = useRef(null);

    useEffect(() => {
        const HEADER_HEIGHT = 105;
        let heightValue: string | number = height;
        let widthValue: string | number = width;

        if (heightValue < window.innerHeight - HEADER_HEIGHT) {
            heightValue = 'calc(100% - ' + HEADER_HEIGHT + 'px)';
        }

        if (widthValue < window.innerWidth) {
            widthValue = '100%';
        }

        setStyle({ height: heightValue, width: widthValue });
    }, [height, width]);

    const addNote = () => {
        dispatch({ type: 'CREATE_NOTE' });
        dispatch({ type: 'UPDATE_BOARD_ZINDEX', zIndex: maxZIndex + 1 });
    };

    const checkAndUpdateBoardSize = (right: number, bottom: number) => {
        const PADDING = 20;

        if (bottom >= height) {
            dispatch({ type: 'UPDATE_BOARD_SIZE', direction: 'height', size: bottom + PADDING });
        }

        if (right >= width) {
            dispatch({ type: 'UPDATE_BOARD_SIZE', direction: 'width', size: right + PADDING });
        }
    };

    return (
        <div id={classes.NoteBoardContainer} style={style} onClick={() => setNoteFocus({ id: '', inFocus: false })}>
            <div ref={boardRef} id={classes.NoteBoard}>
                {Object.keys(notes).map(item => {
                    return (
                        <Note
                            key={notes[item].id}
                            id={notes[item].id}
                            boardId={props.id}
                            boardZIndex={maxZIndex}
                            checkAndUpdateBoardSize={checkAndUpdateBoardSize}
                            noteFocus={noteFocus}
                            setNoteFocus={setNoteFocus}
                            boardRef={boardRef}
                        />
                    );
                })}
                {Object.keys(notes).length === 0 ? (
                    <div id={classes.AddButtonArrowContainer}>
                        <div id={classes.AddButtonArrowBody}>Add Note</div>
                        <div id={classes.AddButtonArrow}></div>
                    </div>
                ) : null}
                <button id={classes.AddButton} onClick={addNote} aria-label='Add Note'>+</button>
            </div>
        </div>
    );
};

export default NoteBoard;

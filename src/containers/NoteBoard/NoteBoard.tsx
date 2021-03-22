import { useState, useEffect } from 'react';

import classes from './NoteBoard.module.css';
import Note from './Note/Note';

const NoteBoard = () => {
    const [dragging, setDragging] = useState(false);
    const [zIndex, setZIndex] = useState(1);
    const [width, setWidth] = useState(window.innerWidth - 1);
    const [height, setHeight] = useState(window.innerHeight - 105);
    const [style, setStyle] = useState({ width: width, height: height })

    const setDraggingState = (value: boolean) => {
        setDragging(value);
    };

    const setZIndexState = () => {
        setZIndex(zIndex => zIndex + 1);
    };

    const setWidthState = (amount: number) => {
        setWidth(amount);
    };

    const setHeightState = (amount: number) => {
        setHeight(amount);
    };

    useEffect(() => {
        setStyle({ ...style, width });
    }, [width]);

    useEffect(() => {
        setStyle({ ...style, height });
    }, [height]);

    return (
        <div id={classes.NoteBoard} style={style}>
            <Note
                dragging={dragging}
                setDraggingState={setDraggingState}
                zIndex={zIndex}
                setZIndex={setZIndexState}
                containerWidth={width}
                setContainerWidth={setWidthState}
                containerHeight={height}
                setContainerHeight={setHeightState}
            />
        </div>
    );
};

export default NoteBoard;

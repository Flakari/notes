import { useState, useEffect } from 'react';

import classes from "./Note.module.css";

interface PropTypes {
    setDraggingState: (state: boolean) => void;
    zIndex: number;
    setZIndex: (state: number) => void;
    containerWidth: number;
    containerHeight: number;
    setContainerWidth: (width: number) => void;
    setContainerHeight: (height: number) => void;
    dragging: boolean;
}

const Note = (props: PropTypes) => {
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [right, setRight] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [focus, setFocus] = useState(false);
    const [zIndex, setZIndex] = useState(0);
    const [style, setStyle] = useState({ zIndex, top: 20, left: 20, cursor: 'grab' });

    const dragStart = (e: any) => {
        setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
        setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);

        props.setDraggingState(true);
        setFocus(true);
        setStyle({ ...style, cursor: 'grabbing' });

        if (zIndex === props.zIndex) return;
        setZIndex(props.zIndex + 1);
        props.setZIndex(zIndex);
    };

    useEffect(() => {
        setStyle({ ...style, zIndex });
    }, [zIndex]);

    useEffect(() => {
        if (right >= props.containerWidth - 20) {
            props.setContainerWidth(right + 20);
        }
    }, [right]);

    useEffect(() => {
        // Use -20 for margin due to 40px height of header
        if (bottom >= props.containerHeight - 20) {
            props.setContainerHeight(bottom - 20);
        }
    }, [bottom]);

    const onDrag = (e: any) => {
        if (props.dragging && focus) {
            const APP_MENU_HEIGHT = 105;
            let top = e.screenY - diffY - APP_MENU_HEIGHT + window.scrollY;
            let left = e.screenX - diffX + window.scrollX;

            if (top < 20) top = 20;
            if (left < 20) left = 20;

            setStyle({ ...style, left, top });
        }
    };

    const dragEnd = (e: any) => {
        setFocus(false);
        props.setDraggingState(false);
        setStyle({ ...style, cursor: 'grab' });
        setRight(e.currentTarget.getBoundingClientRect().right + window.scrollX);
        setBottom(e.currentTarget.getBoundingClientRect().bottom + window.scrollY);
    };

    return (
        <div
            className={classes.Note}
            style={style}
            onMouseDown={dragStart}
            onMouseMove={onDrag}
            onMouseUp={dragEnd}
        ></div>
    );
};

export default Note;

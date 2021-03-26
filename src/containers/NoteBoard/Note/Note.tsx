import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
    id: string;
    top: number;
    left: number;
}

const Note = (props: PropTypes) => {
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [right, setRight] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [focus, setFocus] = useState(false);
    const [zIndex, setZIndex] = useState(0);
    const [style, setStyle] = useState({ zIndex, top: props.top || 20, left: props.left || 20, cursor: 'grab' });
    const dispatch = useDispatch();

    const dragStart = (e: any) => {
        setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
        setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);

        props.setDraggingState(true);
        setFocus(true);
        setStyle({ ...style, cursor: 'grabbing' });
        zIndexHandler();
    };

    const zIndexHandler = () => {
        if (zIndex === props.zIndex) return;
        setZIndex(props.zIndex + 1);
        setStyle({ ...style, zIndex: props.zIndex + 1 });
        props.setZIndex(zIndex);
    };

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
        let right = e.currentTarget.getBoundingClientRect().right + window.scrollX;
        let bottom = e.currentTarget.getBoundingClientRect().bottom + window.scrollY

        setFocus(false);
        props.setDraggingState(false);
        setStyle({ ...style, cursor: 'grab' });
        setRight(right);
        setBottom(bottom);

        if (bottom >= props.containerHeight - 20) {
            props.setContainerHeight(bottom - 20);
        }

        if (right >= props.containerWidth - 20) {
            props.setContainerWidth(right + 20);
        }
        const position = { left: style.left, top: style.top, right, bottom };
        dispatch({ type: 'UPDATE_NOTE_POSITION', noteId: props.id, position });
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

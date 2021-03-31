import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorContainer from '../../EditorContainer/EditorContainer';

import classes from "./Note.module.css";
import State from '../../../store/combinedState';

interface PropTypes {
    setDraggingState: (state: boolean) => void;
    zIndex: number;
    containerWidth: number;
    containerHeight: number;
    setContainerWidth: (width: number) => void;
    setContainerHeight: (height: number) => void;
    dragging: boolean;
    id: string;
    top: number;
    left: number;
    noteFocus: { id: string, inFocus: boolean };
    setNoteFocus: any;
}

const Note = (props: PropTypes) => {
    const boardId = useSelector((state: State) => state.board.currentBoardId);
    const note = useSelector((state: State) => state.board.boards[boardId].notes[props.id]);
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [focus, setFocus] = useState(false);
    const zIndex = useSelector(() => note.zIndex)
    // const [zIndex, setZIndex] = useState(0);
    const [style, setStyle] = useState({ zIndex, top: props.top || 20, left: props.left || 20 });
    const [grabDivStyle, setGrabDivStyle] = useState({ cursor: 'grab' });
    const dispatch = useDispatch();
    const [showEditorButtons, setShowEditorButtons] = useState(false);

    useEffect(() => {
        if (props.noteFocus.inFocus && props.noteFocus.id === note.id) {
            setShowEditorButtons(true);
        } else {
            setShowEditorButtons(false);
        }
    }, [props.noteFocus, note.id])

    const dragStart = (e: any) => {
        e.stopPropagation();
        setDiffX(e.screenX - e.target.getBoundingClientRect().left);
        setDiffY(e.screenY - e.target.getBoundingClientRect().top);

        props.setDraggingState(true);
        setFocus(true);
        setGrabDivStyle({ cursor: 'grabbing' });
        zIndexHandler();
    };

    const zIndexHandler = () => {
        if (zIndex === props.zIndex) return;
        dispatch({ type: 'UPDATE_NOTE_ZINDEX', noteId: props.id, zIndex: props.zIndex + 1 });
        dispatch({ type: 'UPDATE_BOARD_ZINDEX', zIndex: props.zIndex + 1 });
        setStyle({ ...style, zIndex: props.zIndex + 1 });
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
        setGrabDivStyle({ cursor: 'grab' });

        if (bottom >= props.containerHeight - 20) {
            props.setContainerHeight(bottom - 20);
        }

        if (right >= props.containerWidth - 20) {
            props.setContainerWidth(right + 20);
        }

        if (style.left !== note.left || style.top !== note.top || right !== note.right || bottom !== note.bottom) {
            const position = { left: style.left, top: style.top, right, bottom };
            dispatch({ type: 'UPDATE_NOTE_POSITION', noteId: props.id, position });
        }
    };

    const saveNote = useCallback((id: string, content: string) => {
        dispatch({ type: 'SAVE_NOTE_CONTENT', noteId: id, content });
    }, [dispatch]);

    const clickHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        props.setNoteFocus({ id: note.id, inFocus: true });
        zIndexHandler();
    };

    return (
        <div
            className={classes.Note}
            style={style}
            onMouseMove={onDrag}
            onMouseUp={dragEnd}
            onClick={clickHandler}
        >
            <div
                className={classes.NoteGrabContainer}
                onMouseDown={dragStart}
                style={grabDivStyle}
            ><hr /></div>
            <EditorContainer
                id={props.id}
                content={note.content}
                editorButtonClass={classes.NoteButtonContainer}
                editorClass={classes.NoteEditorContainer}
                saveNote={saveNote}
                showButtons={showEditorButtons}
            />
            <button onClick={(e: SyntheticEvent) => { dispatch({ type: 'DELETE_NOTE', id: props.id }); e.stopPropagation() }}>Delete</button>
        </div>
    );
};

export default Note;

import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorContainer from '../../EditorContainer/EditorContainer';

import classes from "./Note.module.css";
import State from '../../../store/combinedState';
import NoteMenu from './NoteMenu/NoteMenu';

interface PropTypes {
    setDraggingState: (state: boolean) => void;
    zIndex: number;
    containerWidth: number;
    containerHeight: number;
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
    const zIndex = useSelector(() => note.zIndex);
    const color = useSelector(() => note.color);
    const [style, setStyle] = useState({ zIndex, top: props.top || 20, left: props.left || 20 });
    const locks = useSelector(() => note.locks);
    const [grabDivStyle, setGrabDivStyle] = useState(locks.position ? { cursor: 'default' } : { cursor: 'grab' });
    const dispatch = useDispatch();
    const [showEditorButtons, setShowEditorButtons] = useState(false);
    const [showNoteMenu, setShowNoteMenu] = useState(false);
    const [editorButtonContainerClass, setEditorButtonContainerClass] = useState(classes.NoteButtonContainer);

    useEffect(() => {
        if (props.noteFocus.inFocus && props.noteFocus.id === note.id) {
            setShowEditorButtons(true);
        } else {
            setShowEditorButtons(false);
            setShowNoteMenu(false);
        }
    }, [props.noteFocus, note.id]);

    useEffect(() => {
        if (locks.position) {
            setGrabDivStyle({ cursor: 'default' })
        } else {
            setGrabDivStyle({ cursor: 'grab' });
        }
    }, [locks.position]);

    const dragStart = (e: any) => {
        if (locks.position) return;

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
        if (locks.position) return;

        if (props.dragging && focus) {
            const APP_MENU_HEIGHT = 105;
            let top = e.screenY - diffY - APP_MENU_HEIGHT + window.scrollY;
            let left = e.screenX - diffX + window.scrollX;

            if (top < 20) top = 20;
            if (left < 20) left = 20;

            setShowEditorButtons(false);
            setShowNoteMenu(false);
            setStyle({ ...style, left, top });
        }
    };

    const setEditorButtonClass = (right: number, top: number) => {
        const classList: string[] = [classes.NoteButtonContainer];

        if (right > (window.innerWidth * 0.85)) {
            classList.push(classes.right);
        }

        if (top < ((window.innerHeight - 105) * 0.1)) {
            classList.push(classes.bottom);
        }

        setEditorButtonContainerClass(classList.join(' '));
    }

    const dragEnd = (e: any) => {
        if (locks.position) return;

        let right = e.currentTarget.getBoundingClientRect().right + window.scrollX;
        let bottom = e.currentTarget.getBoundingClientRect().bottom + window.scrollY;

        setEditorButtonClass(right - window.scrollX, style.top);

        setFocus(false);
        props.setDraggingState(false);
        setGrabDivStyle({ cursor: 'grab' });

        if (bottom >= props.containerHeight + 80) {
            dispatch({ type: 'UPDATE_BOARD_SIZE', direction: 'height', size: bottom - 80 });
        }

        if (right >= props.containerWidth - 20) {
            dispatch({ type: 'UPDATE_BOARD_SIZE', direction: 'width', size: right + 20 });
        }

        const noteMoved = style.left !== note.left || style.top !== note.top || right !== note.right || bottom !== note.bottom;

        if (noteMoved) {
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

    const toggleNoteMenu = () => {
        setShowNoteMenu((prevState) => !prevState);
    };

    return (
        <div
            className={[classes.Note, classes[color]].join(' ')}
            style={style}
            onMouseMove={onDrag}
            onMouseUp={dragEnd}
            onClick={clickHandler}
        >
            <div
                className={classes.NoteGrabContainer}
                onMouseDown={dragStart}
                style={grabDivStyle}
            ><div /></div>
            <EditorContainer
                id={props.id}
                content={note.content}
                editorButtonClass={editorButtonContainerClass}
                editorClass={classes.NoteEditorContainer}
                saveNote={saveNote}
                showButtons={showEditorButtons}
                editorButtonSelection='basic'
                lockEditor={locks.editor}
            />
            {showEditorButtons ?
                <button onClick={toggleNoteMenu} className={classes.NoteMenuButton}>
                    <svg viewBox="0 0 515.555 515.555" xmlns="http://www.w3.org/2000/svg" aria-labelledby="menuTitle menuDesc" role="menu">
                        <title id="menuTitle">Note Menu Button</title>
                        <desc id="menuDesc">Opens menu for the corresponding note</desc>
                        <path d="M303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0" />
                    </svg>
                </button> : null
            }
            {showNoteMenu ? <NoteMenu id={props.id} hideMenu={() => setShowNoteMenu(false)} /> : null}
        </div>
    );
};

export default Note;

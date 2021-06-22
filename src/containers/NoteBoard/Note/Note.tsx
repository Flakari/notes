import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorContainer from '../../EditorContainer/EditorContainer';

import classes from "./Note.module.css";
import State from '../../../store/combinedState';
import NoteMenu from './NoteMenu/NoteMenu';
import { basicOverallLayout } from '../../EditorButtonContainer/EdtiorButtonInformation/EditorButtonLayouts';
import OpenMenuButton from '../../../components/OpenMenuButton/OpenMenuButton';

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

interface NoteStyle {
    zIndex: number,
    top: number,
    left: number,
    width?: number
}

const Note = (props: PropTypes) => {
    const boardId = useSelector((state: State) => state.board.currentBoardId);
    const note = useSelector((state: State) => state.board.boards[boardId].notes[props.id]);
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [focus, setFocus] = useState(false);
    const zIndex = useSelector(() => note.zIndex);
    const color = useSelector(() => note.color);
    const [style, setStyle] = useState<NoteStyle>({ zIndex, top: props.top || 20, left: props.left || 20 });
    const locks = useSelector(() => note.locks);
    const [grabDivStyle, setGrabDivStyle] = useState(locks.position ? { cursor: 'default' } : { cursor: 'grab' });
    const dispatch = useDispatch();
    const [showEditorButtons, setShowEditorButtons] = useState(false);
    const [showNoteMenuToggle, setShowNoteMenuToggle] = useState(false);
    const [showNoteMenu, setShowNoteMenu] = useState(false);
    const [editorButtonContainerClass, setEditorButtonContainerClass] = useState(classes.NoteButtonContainer);

    const setEditorButtonState = useCallback(() => {
        if (!locks.editor) {
            setShowEditorButtons(true);
        } else {
            setShowEditorButtons(false);
        };
    }, [locks.editor]);

    useEffect(() => {
        if (props.noteFocus.inFocus && props.noteFocus.id === note.id) {
            setEditorButtonState();
            setShowNoteMenuToggle(true);
        } else {
            setShowEditorButtons(false);
            setShowNoteMenuToggle(false);
            setShowNoteMenu(false);
        }
    }, [props.noteFocus, note.id, locks.editor, setEditorButtonState]);

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
        setStyle({ ...style, width: e.target.getBoundingClientRect().width });
    };

    const zIndexHandler = () => {
        if (zIndex === props.zIndex) return;
        dispatch({ type: 'UPDATE_NOTE_ZINDEX', noteId: props.id, zIndex: props.zIndex + 1 });
        dispatch({ type: 'UPDATE_BOARD_ZINDEX', zIndex: props.zIndex + 1 });
        setStyle({ ...style, zIndex: props.zIndex + 1 });
    };

    const onDrag = (e: any) => {
        if (locks.position) return;

        const APP_MENU_HEIGHT_MINUS_PADDING = 85;
        let top = e.screenY - diffY - APP_MENU_HEIGHT_MINUS_PADDING + window.scrollY;
        let left = e.screenX - diffX + window.scrollX;

        if (top < 40) top = 40;
        if (left < 20) left = 20;

        setShowEditorButtons(false);
        setShowNoteMenuToggle(false);
        setShowNoteMenu(false);
        setStyle({ ...style, left, top });
    };

    const setEditorButtonClass = (right: number, top: number) => {
        const classList: string[] = [classes.NoteButtonContainer];

        if (right > ((window.innerWidth * 0.75) + window.scrollX)) {
            classList.push(classes.right);
        }

        if (top < ((window.innerHeight - 105) * 0.1) + window.scrollY) {
            classList.push(classes.bottom);
        }

        setEditorButtonContainerClass(classList.join(' '));
    };

    const removeNoteWidth = () => {
        let tempStyle = { ...style }
        delete tempStyle.width;
        setStyle(tempStyle);
    };

    const setNoteStates = () => {
        setFocus(false);
        props.setDraggingState(false);
        setGrabDivStyle({ cursor: 'grab' });
    };

    const checkAndUpdateBoardSize = (right: number, bottom: number) => {
        if (bottom >= props.containerHeight + 80) {
            dispatch({ type: 'UPDATE_BOARD_SIZE', direction: 'height', size: bottom - 80 });
        }

        if (right >= props.containerWidth - 20) {
            dispatch({ type: 'UPDATE_BOARD_SIZE', direction: 'width', size: right + 20 });
        }
    };

    const checkAndUpdateNotePosition = (right: number, bottom: number) => {
        const noteMoved = style.left !== note.left || style.top !== note.top || right !== note.right || bottom !== note.bottom;

        if (noteMoved) {
            const position = { left: style.left, top: style.top, right, bottom };
            dispatch({ type: 'UPDATE_NOTE_POSITION', noteId: props.id, position });
        }
    };

    const dragEnd = (e: any) => {
        if (locks.position) return;

        let right = e.currentTarget.getBoundingClientRect().right + window.scrollX;
        let bottom = e.currentTarget.getBoundingClientRect().bottom + window.scrollY;

        removeNoteWidth();
        setEditorButtonClass(right - window.scrollX, style.top);

        setNoteStates();

        checkAndUpdateBoardSize(right, bottom);
        checkAndUpdateNotePosition(right, bottom);
    };

    const saveNote = useCallback((id: string, content: string) => {
        dispatch({ type: 'SAVE_NOTE_CONTENT', noteId: id, content });
    }, [dispatch]);

    const clickHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        props.setNoteFocus({ id: note.id, inFocus: true });
        if (showNoteMenu) setShowNoteMenu(false);
        zIndexHandler();
    };

    const toggleNoteMenu = () => {
        setShowNoteMenu((prevState) => !prevState);
    };

    return (
        <div
            className={[classes.Note, classes[color]].join(' ')}
            style={style}
            {...(props.dragging && focus && { onMouseMove: onDrag })}
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
                editorButtonSelection={basicOverallLayout}
                lockEditor={locks.editor}
            />
            {showNoteMenuToggle ? <OpenMenuButton click={toggleNoteMenu} menuClass={classes.NoteMenuButton} /> : null}
            {showNoteMenu ? <NoteMenu id={props.id} hideMenu={() => setShowNoteMenu(false)} /> : null}
        </div>
    );
};

export default Note;

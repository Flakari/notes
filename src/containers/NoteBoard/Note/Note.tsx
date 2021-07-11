import { SyntheticEvent, useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorContainer from '../../EditorContainer/EditorContainer';

import classes from "./Note.module.css";
import State from '../../../store/combinedState';
import NoteMenu from './NoteMenu/NoteMenu';
import { basicOverallLayout } from '../../EditorButtonContainer/EdtiorButtonInformation/EditorButtonLayouts';
import OpenMenuButton from '../../../components/OpenMenuButton/OpenMenuButton';

interface PropTypes {
    boardZIndex: number;
    checkAndUpdateBoardSize: (right: number, bottom: number) => void;
    id: string;
    boardId: string;
    noteFocus: { id: string, inFocus: boolean };
    setNoteFocus: any;
    boardRef: any;
}

interface NoteStyle {
    zIndex: number,
    top: number,
    left: number,
    width?: number
}

const Note = (props: PropTypes) => {
    const { zIndex, locks, color, ...note } = useSelector((state: State) => state.board.boards[props.boardId].notes[props.id]);
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [noteTop, setNoteTop] = useState(note.top);
    const [noteLeft, setNoteLeft] = useState(note.left);
    const [dragging, setDragging] = useState(false);
    const [style, setStyle] = useState<NoteStyle>({ zIndex, top: note.top || 0, left: note.left || 0 });
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

    useLayoutEffect(() => {
        if (noteTop < 0) setNoteTop(0);
        if (noteLeft < 0) setNoteLeft(0);

        setStyle(s => {
            return { ...s, left: noteLeft, top: noteTop }
        });
    }, [noteTop, noteLeft])

    useEffect(() => {
        if (props.noteFocus.inFocus && props.noteFocus.id === props.id) {
            setEditorButtonState();
            setShowNoteMenuToggle(true);
        } else {
            setShowEditorButtons(false);
            setShowNoteMenuToggle(false);
            setShowNoteMenu(false);
        }
    }, [props.noteFocus, props.id, locks.editor, setEditorButtonState]);

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

        setDragging(true);
        setGrabDivStyle({ cursor: 'grabbing' });
        zIndexHandler();
        setStyle({ ...style, width: e.target.getBoundingClientRect().width });
    };

    const zIndexHandler = () => {
        if (zIndex === props.boardZIndex) return;
        dispatch({ type: 'UPDATE_NOTE_ZINDEX', noteId: props.id, zIndex: props.boardZIndex + 1 });
        dispatch({ type: 'UPDATE_BOARD_ZINDEX', zIndex: props.boardZIndex + 1 });
        setStyle({ ...style, zIndex: props.boardZIndex + 1 });
    };

    const onDrag = (e: any) => {
        if (locks.position) return;

        setNoteTop(e.screenY - diffY - props.boardRef.current.offsetTop + window.scrollY);
        setNoteLeft(e.screenX - diffX - props.boardRef.current.offsetLeft + window.scrollX);

        setShowEditorButtons(false);
        setShowNoteMenuToggle(false);
        setShowNoteMenu(false);
    };

    const setEditorButtonClass = (right: number, top: number) => {
        const classList: string[] = [classes.NoteButtonContainer];

        if (right > ((window.innerWidth * 0.85) + window.scrollX)) {
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
        setDragging(false);
        setGrabDivStyle({ cursor: 'grab' });
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
        setEditorButtonClass(right, style.top);

        setNoteStates();

        props.checkAndUpdateBoardSize(right, bottom);
        checkAndUpdateNotePosition(right, bottom);
    };

    const saveNote = useCallback((id: string, content: string) => {
        dispatch({ type: 'SAVE_NOTE_CONTENT', noteId: id, content });
    }, [dispatch]);

    const clickHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        props.setNoteFocus({ id: props.id, inFocus: true });
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
            {...(dragging && { onMouseMove: onDrag })}
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

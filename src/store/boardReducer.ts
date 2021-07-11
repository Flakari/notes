import { v4 } from 'uuid';

import { updateLocalStorage } from './utility';

export interface Note {
    id: string;
    content: string;
    left: number;
    top: number;
    right: number;
    bottom: number;
    zIndex: number;
    color: string;
    locks: {
        editor: boolean,
        position: boolean,
        delete: boolean
    }
}

type LockTypes = 'editor' | 'position' | 'delete';

interface Board {
    title: string;
    notes: { [name: string]: Note };
    id: string;
    width: number;
    height: number;
    maxZIndex: number;
}

export interface State {
    boards: { [name: string]: Board };
    showBoard: boolean;
    currentBoardId: string;
}

const initialState: State = {
    boards: JSON.parse(localStorage.getItem('boards') || '{}'),
    showBoard: false,
    currentBoardId: ''
};

interface BoardActions {
    title: string;
    id: string;
    zIndex: number;
    direction: string;
    size: number;
}

interface NoteActions {
    noteId: string;
    position: { left: number, top: number, right: number, bottom: number };
    content: string;
    color: string;
    lockType: LockTypes;
}

interface ReducerActions extends BoardActions, NoteActions {
    type: string;
}

const createBaseNote = (id: string, zIndex: number) => {
    return {
        id,
        content: '',
        left: window.scrollX,
        top: window.scrollY,
        right: 0,
        bottom: 0,
        zIndex,
        color: '',
        locks: { editor: false, position: false, delete: false }
    };
};

const createNewNote = (state: State) => {
    const id = v4();
    const newZIndex = state.boards[state.currentBoardId].maxZIndex + 1;
    const tempBoardsState = { ...state.boards };
    const notes = tempBoardsState[state.currentBoardId].notes;
    notes[id] = createBaseNote(id, newZIndex);

    return tempBoardsState;
};

const createTempNote = (state: State, id: string, changeValue: {}) => {
    return { ...state.boards[state.currentBoardId].notes[id], ...changeValue };
};

const updateNote = (state: State, id: string, noteValue: Note) => {
    return {
        ...state.boards,
        [state.currentBoardId]: {
            ...state.boards[state.currentBoardId],
            notes: {
                ...state.boards[state.currentBoardId].notes,
                [id]: {
                    ...noteValue
                }
            }
        }
    };
};

const updateBoard = (state: State, board: { [name: string]: Board }, newBoardValue: {}) => {
    return {
        ...board,
        [state.currentBoardId]: {
            ...board[state.currentBoardId],
            ...newBoardValue
        }
    };
};

// Takes care of updating state and local storage, something that is needed in each state update
const updateBoardReducer = (state: State, newBoard: any) => {
    updateLocalStorage('boards', newBoard);
    return {
        ...state,
        boards: newBoard
    };
};

const updateNoteInReducer = (state: State, id: string, changeValue: any) => {
    const note = createTempNote(state, id, changeValue);
    const updatedBoard = updateNote(state, id, note);

    return updateBoardReducer(state, updatedBoard);
};

const boardReducer = (state = initialState, action: ReducerActions) => {
    switch (action.type) {
        case 'CREATE_BOARD': {
            if (Object.keys(state.boards).length >= 2) return state;
            const id = v4();
            const newBoards = { ...state.boards }
            newBoards[id] = { title: '', notes: {}, id, width: 0, height: 0, maxZIndex: 1 };

            return updateBoardReducer(state, newBoards);
        }
        case 'SAVE_BOARD_TITLE': {
            const newBoards = {
                ...state.boards,
                [state.currentBoardId]: {
                    ...state.boards[state.currentBoardId],
                    title: action.title
                }
            };
            return updateBoardReducer(state, newBoards);
        }
        case 'UPDATE_BOARD_ZINDEX':
            return updateBoardReducer(state, updateBoard(state, state.boards, { maxZIndex: action.zIndex }));
        case 'UPDATE_BOARD_SIZE':
            return updateBoardReducer(state, updateBoard(state, state.boards, { [action.direction]: action.size }));
        case 'SHOW_BOARD':
            return { ...state, currentBoardId: action.id, showBoard: true };
        case 'HIDE_BOARD':
            return { ...state, currentBoardId: '', showBoard: false };
        case 'DELETE_BOARD':
            const newBoards = { ...state.boards };
            delete newBoards[action.id];

            return updateBoardReducer(state, newBoards);
        default:
            return noteReducer(state, action);
    }
};

const noteReducer = (state = initialState, action: ReducerActions) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return updateBoardReducer(state, createNewNote(state));
        case 'UPDATE_NOTE_POSITION':
            return updateNoteInReducer(state, action.noteId, { ...action.position });
        case 'UPDATE_NOTE_ZINDEX':
            return updateNoteInReducer(state, action.noteId, { zIndex: action.zIndex });
        case 'SAVE_NOTE_CONTENT':
            return updateNoteInReducer(state, action.noteId, { content: action.content });
        case 'CHANGE_NOTE_COLOR':
            return updateNoteInReducer(state, action.noteId, { color: action.color });
        case 'TOGGLE_NOTE_LOCK':
            const lockPath = state.boards[state.currentBoardId].notes[action.noteId].locks

            return updateNoteInReducer(state, action.noteId, { locks: { ...lockPath, [action.lockType]: !lockPath[action.lockType] } });
        case 'DELETE_NOTE': {
            const notes = { ...state.boards[state.currentBoardId].notes }
            delete notes[action.id];
            const updatedBoard = {
                ...state.boards,
                [state.currentBoardId]: {
                    ...state.boards[state.currentBoardId],
                    notes
                }
            }

            return updateBoardReducer(state, updatedBoard);
        }
        default:
            return state;
    }
};

export default boardReducer;

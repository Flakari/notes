import { AnyAction } from 'redux';
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
}

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
    boards: localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards') || '{}') : {},
    showBoard: false,
    currentBoardId: ''
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

const updateBoardZIndex = (state: State, board: { [name: string]: Board }, zIndex: number) => {
    return {
        ...board,
        [state.currentBoardId]: {
            ...board[state.currentBoardId],
            maxZIndex: zIndex
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

const boardReducer = (state = initialState, action: AnyAction) => {
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
            return updateBoardReducer(state, updateBoardZIndex(state, state.boards, action.zIndex));
        case 'SHOW_BOARD':
            return { ...state, currentBoardId: action.id, showBoard: true };
        case 'HIDE_BOARD':
            return { ...state, currentBoardId: action.id, showBoard: false };
        default:
            return noteReducer(state, action);
    }
};

const noteReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            const id = v4();
            const newZIndex = state.boards[state.currentBoardId].maxZIndex + 1
            const tempBoardsState = { ...state.boards };
            const notes = tempBoardsState[state.currentBoardId].notes;
            notes[id] = { id, content: '', left: 0, top: 0, right: 0, bottom: 0, zIndex: newZIndex, color: '' };

            return updateBoardReducer(state, tempBoardsState);
        case 'UPDATE_NOTE_POSITION':
            return updateNoteInReducer(state, action.noteId, { ...action.position });
        case 'UPDATE_NOTE_ZINDEX':
            return updateNoteInReducer(state, action.noteId, { zIndex: action.zIndex });
        case 'SAVE_NOTE_CONTENT':
            return updateNoteInReducer(state, action.noteId, { content: action.content });
        case 'CHANGE_NOTE_COLOR':
            return updateNoteInReducer(state, action.noteId, { color: action.color });
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

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

const boardReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CREATE_BOARD': {
            if (Object.keys(state.boards).length >= 2) return state;
            const id = v4();
            const newBoards = { ...state.boards }
            newBoards[id] = { title: '', notes: {}, id, width: 0, height: 0, maxZIndex: 1 };
            updateLocalStorage('boards', newBoards);
            return {
                ...state,
                boards: newBoards
            };
        }
        case 'SAVE_BOARD_TITLE': {
            const newBoards = {
                ...state.boards,
                [state.currentBoardId]: {
                    ...state.boards[state.currentBoardId],
                    title: action.title
                }
            };

            updateLocalStorage('boards', newBoards);

            return {
                ...state,
                boards: newBoards
            };
        }
        case 'UPDATE_BOARD_ZINDEX':
            const updatedZIndex = updateBoardZIndex(state, state.boards, action.zIndex);
            updateLocalStorage('boards', updatedZIndex);
            return {
                ...state,
                boards: updatedZIndex
            };
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
            notes[id] = { id, content: '', left: 0, top: 0, right: 0, bottom: 0, zIndex: newZIndex };
            updateLocalStorage('boards', tempBoardsState);

            return {
                ...state,
                boards: tempBoardsState
            };
        case 'UPDATE_NOTE_POSITION': {
            const note = createTempNote(state, action.noteId, { ...action.position });
            const updatedBoard = updateNote(state, action.noteId, note);
            updateLocalStorage('boards', updatedBoard);

            return {
                ...state,
                boards: updatedBoard
            };
        }
        case 'UPDATE_NOTE_ZINDEX': {
            const note = createTempNote(state, action.noteId, { zIndex: action.zIndex });
            const updatedBoard = updateNote(state, action.noteId, note);

            updateLocalStorage('boards', updatedBoard);

            return {
                ...state,
                boards: updatedBoard
            };
        }
        case 'SAVE_NOTE_CONTENT': {
            const note = createTempNote(state, action.noteId, { content: action.content });
            const updatedBoard = updateNote(state, action.noteId, note);

            updateLocalStorage('boards', updatedBoard);

            return {
                ...state,
                boards: updatedBoard
            };
        }
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
            updateLocalStorage('boards', updatedBoard)

            return {
                ...state,
                boards: updatedBoard
            };
        }
        default:
            return state;
    }
};

export default boardReducer;

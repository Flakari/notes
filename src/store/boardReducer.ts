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
}

interface Board {
    title: string;
    notes: { [name: string]: Note };
    id: string;
    width: number;
    height: number;
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

const boardReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CREATE_BOARD':
            if (Object.keys(state.boards).length >= 2) return state;
            const id = v4();
            const newBoards = { ...state.boards }
            newBoards[id] = { title: '', notes: {}, id, width: 0, height: 0 };
            updateLocalStorage('boards', newBoards);
            return {
                ...state,
                boards: newBoards
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
            const tempBoardsState = { ...state.boards };
            const notes = tempBoardsState[action.boardId].notes;
            notes[id] = { id, content: '', left: 0, top: 0, right: 0, bottom: 0 };
            updateLocalStorage('boards', tempBoardsState);

            return {
                ...state,
                boards: tempBoardsState
            };
        case 'UPDATE_NOTE_POSITION':
            const note = { ...state.boards[state.currentBoardId].notes[action.noteId], ...action.position };
            const updatedBoard = updateNote(state, action.noteId, note);
            updateLocalStorage('boards', updatedBoard);

            return {
                ...state,
                boards: updatedBoard
            };
        default:
            return state;
    }
};

export default boardReducer;

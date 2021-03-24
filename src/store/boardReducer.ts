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
        default:
            return state;
    }
};

export default boardReducer;

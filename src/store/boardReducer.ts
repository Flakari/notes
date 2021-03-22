import { AnyAction } from 'redux';
import { v4 } from 'uuid';

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
    width: number;
    height: number;
}

export interface State {
    boards: Board[];
    showBoard: boolean;
}

const initialState: State = {
    boards: localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('notes') || '[]') : [],
    showBoard: false
};

const boardReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'SHOW_BOARD':
            return state;
        default:
            return state;
    }
};

export default boardReducer;

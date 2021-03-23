import { AnyAction } from 'redux';
import { v4 } from 'uuid';

import { updateLocalStorage } from './utility';

export interface Page {
    id: string;
    title: string;
    content: string;
};

export interface State {
    pages: Page[];
    currentPageId: string;
    showEditor: boolean;
};

const initialState: State = {
    pages: localStorage.getItem('pages') ? JSON.parse(localStorage.getItem('pages') || '[]') : [],
    currentPageId: '',
    showEditor: !!localStorage.getItem('pages')
};

const findPageIndex = (state: State, id: string): number => {
    for (let i = 0; i < state.pages.length; i++) {
        if (state.pages[i].id === id) {
            return i;
        }
    }
    return 0;
};

const savePage = (state: State, [id, title = '', content = '']: string[]) => {
    const newPageState = state.pages.map(item => {
        if (item.id === id) {
            if (content) item.content = content;
            if (title) item.title = title;
        }
        return item;
    });

    return newPageState;
};

const deletePage = (state: State, id: string) => {
    const newPagesState = [...state.pages];
    newPagesState.splice(findPageIndex(state, id), 1);
    return newPagesState;
};

const updatePages = (state: State, fn: (state: State, action: any) => {}, updateAction: any) => {
    const newPage = fn(state, updateAction);
    updateLocalStorage('pages', newPage);
    return { ...state, pages: newPage };
};

const pageReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CREATE_PAGE':
            const newPages = state.pages.concat({ id: v4(), title: '', content: '' });
            updateLocalStorage('pages', newPages);
            return {
                ...state,
                pages: newPages,
                showEditor: true
            }
        case 'SAVE_PAGE':
            return updatePages(state, savePage, [action.id, null, action.content]);
        case 'SAVE_PAGE_TITLE':
            return updatePages(state, savePage, [action.id, action.title, null]);
        case 'DELETE_PAGE':
            return updatePages(state, deletePage, action.id);
        case 'SHOW_PAGE':
            return { ...state, currentPageId: action.id, showEditor: true };
        case 'HIDE_PAGE':
            return { ...state, currentPageId: '', showEditor: false };
        default:
            return state;
    }
};

export default pageReducer;

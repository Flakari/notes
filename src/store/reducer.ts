import { AnyAction } from 'redux';
import { v4 } from 'uuid';

export interface Note {
    id: string;
    title: string;
    content: string;
};

interface State {
    notes: Note[];
    currentNoteId: string;
    showEditor: boolean;
};

const initialState: State = {
    notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') || '[]') : [],
    currentNoteId: '',
    showEditor: !!localStorage.getItem('notes')
};

const saveNote = (state: State, [id, title = '', content = '']: string[]) => {
    const newNote = state.notes.filter(item => item.id === id)[0];
    if (content) newNote.content = content;
    if (title) newNote.title = title;
    let index = 0;

    for (let i = 0; i < state.notes.length; i++) {
        if (state.notes[i].id === id) {
            index = i;
        }
    }
    const newNotesState = [...state.notes];
    newNotesState[index] = newNote;
    return newNotesState;
};

// {} on save actions to block scope newNote variable
const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return {
                ...state,
                notes: state.notes.concat({ id: v4(), title: '', content: '' }),
                showEditor: true
            }
        case 'SAVE_NOTE': {
            const newNote = saveNote(state, [action.id, null, action.content]);
            localStorage.setItem('notes', JSON.stringify(newNote));
            return { ...state, notes: newNote };
        }
        case 'SAVE_TITLE': {
            const newNote = saveNote(state, [action.id, action.title, null]);
            localStorage.setItem('notes', JSON.stringify(newNote));
            return { ...state, notes: newNote };
        }
        case 'SHOW_NOTE':
            return { ...state, currentNoteId: action.id };
        default:
            return state;
    }
};

export default reducer;

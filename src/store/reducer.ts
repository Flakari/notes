import { AnyAction } from 'redux';
import { v4 } from 'uuid';

export interface Note {
    id: string;
    title: string;
    content: string;
};

interface State {
    notes: Note[];
    showEditor: boolean;
};

const initialState: State = {
    notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') || '[]') : [],
    showEditor: !!localStorage.getItem('notes')
};

const saveNote = (state: State, [id, title, content]: string[]) => {
    const newNote = state.notes.filter(item => item.id === id)[0];
    newNote.content = content;
    newNote.title = title;
    const index = state.notes.indexOf(newNote);
    const newNotesState = [...state.notes];
    newNotesState[index] = newNote;
    return newNotesState;
};

const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return {
                ...state,
                notes: state.notes.concat({ id: v4(), title: '', content: '' }),
                showEditor: true
            }
        case 'SAVE_NOTE':
            const newNote = saveNote(state, [action.id, action.title, action.content]);
            localStorage.setItem('notes', JSON.stringify(newNote));
            return { ...state, notes: newNote };
        default:
            return state;
    }
};

export default reducer;

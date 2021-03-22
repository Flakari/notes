import { State as NoteState } from './noteReducer';
import { State as BoardState } from './boardReducer';

interface CombinedState {
    note: NoteState;
    board: BoardState;
}

export default CombinedState;

import { State as PageState } from './pageReducer';
import { State as BoardState } from './boardReducer';

interface CombinedState {
    page: PageState;
    board: BoardState;
}

export default CombinedState;

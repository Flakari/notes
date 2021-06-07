import { useSelector, useDispatch } from 'react-redux'

import State from '../../../store/combinedState';
import AddButton from '../AddButton/AddButton';

interface PropTypes {
    toggle: () => void;
}

const BoardMenu = (props: PropTypes) => {
    const boards = useSelector((state: State) => state.board.boards);
    const boardState = useSelector((state: State) => state.board);
    const dispatch = useDispatch();

    const clickHandler = (id: string) => {
        props.toggle();
        dispatch({ type: 'SHOW_BOARD', id });
        dispatch({ type: 'HIDE_PAGE' });
    };

    return (
        <div>
            <ul>
                {Object.keys(boards).filter(item => boards[item].id !== boardState.currentBoardId).map(item => {
                    return (
                        <li key={boards[item].id}>
                            <span onClick={() => clickHandler(boards[item].id)}>{boards[item].title || 'Untitled'}</span>
                            <button onClick={() => dispatch({ type: 'DELETE_BOARD', id: boards[item].id })}>X</button>
                        </li>
                    );
                })}
            </ul>
            <AddButton type='Board' />
        </div>
    );
};

export default BoardMenu;

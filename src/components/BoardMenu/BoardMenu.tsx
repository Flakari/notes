import { useSelector, useDispatch } from 'react-redux'

import State from '../../store/combinedState';

interface PropTypes {
    props: { containerToggle: () => void };
}

const BoardMenu = (props: PropTypes) => {
    const boards = useSelector((state: State) => state.board.boards);
    const boardState = useSelector((state: State) => state.board);
    const dispatch = useDispatch();

    const clickHandler = (id: string) => {
        props.props.containerToggle();
        dispatch({ type: 'SHOW_BOARD', id });
        dispatch({ type: 'HIDE_PAGE' });
    };

    const createBoard = () => {
        dispatch({ type: 'CREATE_BOARD' });
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
            <button onClick={createBoard}>Create New Board</button>
        </div>
    );
};

export default BoardMenu;

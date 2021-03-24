import { useSelector, useDispatch } from 'react-redux'

import State from '../../store/combinedState';

interface PropTypes {
    props: { containerToggle: () => void };
}

const BoardMenu = (props: PropTypes) => {
    const boards = useSelector((state: State) => state.board.boards);
    const dispatch = useDispatch();

    const clickHandler = (id: string) => {
        props.props.containerToggle();
        dispatch({ type: 'SHOW_BOARD', id });
        dispatch({ type: 'HIDE_PAGE' });
    }

    return (
        <div>
            <ul>
                {Object.keys(boards).map(item => {
                    return (
                        <li key={boards[item].id}>
                            <span onClick={() => clickHandler(boards[item].id)}>{boards[item].title || 'Untitled'}</span>
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => dispatch({ type: 'CREATE_BOARD' })}>Create New Board</button>
        </div>
    );
};

export default BoardMenu;

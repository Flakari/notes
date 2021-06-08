import { useSelector, useDispatch } from 'react-redux'

import State from '../../../store/combinedState';
import AddButton from '../AddButton/AddButton';
import MenuItem from '../MenuItem/MenuItem';
import classes from '../Menu.module.css';

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
        <div className={classes.Menu}>
            <ul>
                <AddButton type='Board' />
                {Object.keys(boards).filter(item => boards[item].id !== boardState.currentBoardId).map(item => {
                    return (
                        <li key={boards[item].id}>
                            <MenuItem
                                title={boards[item].title || 'Untitled'}
                                click={() => clickHandler(boards[item].id)}
                                delete={{ type: 'DELETE_BOARD', id: boards[item].id }}
                                type='board'
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BoardMenu;

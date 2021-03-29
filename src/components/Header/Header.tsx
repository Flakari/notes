import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../containers/Title/Title';

export const Header = () => {
    const currentId = useSelector((state: any) => {
        if (state.page.currentPageId !== '') return state.page.currentPageId;
        if (state.board.currentBoardId !== '') return state.board.currentBoardId;
        return '';
    });
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch({ type: 'CREATE_PAGE' });
    };

    return (
        <header id={classes.MainHeader}>
            <div id={classes.TitleContainer}>
                {currentId !== '' ? <Title key={currentId} id={currentId} /> : <p>Notes</p>}
            </div>
            <button id={classes.CreateNote} onClick={clickHandler}>Create Note</button>
        </header>
    );
};

export default Header;

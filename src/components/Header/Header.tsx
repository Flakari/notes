import classes from './Header.module.css';
import { useSelector } from 'react-redux';

import Title from '../../containers/Title/Title';

export const Header = () => {
    const currentId = useSelector((state: any) => {
        if (state.page.currentPageId !== '') return state.page.currentPageId;
        if (state.board.currentBoardId !== '') return state.board.currentBoardId;
        return '';
    });

    return (
        <header id={classes.MainHeader}>
            <div id={classes.TitleContainer}>
                {currentId !== '' ? <Title key={currentId} id={currentId} /> : <p>Notes</p>}
            </div>
        </header>
    );
};

export default Header;

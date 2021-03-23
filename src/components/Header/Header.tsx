import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../containers/Title/Title';

export const Header = () => {
    const currentPageId = useSelector((state: any) => state.page.currentPageId);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch({ type: 'CREATE_PAGE' });
    };

    return (
        <header id={classes.MainHeader}>
            <div id={classes.TitleContainer}>
                {currentPageId !== '' ? <Title key={currentPageId} /> : <p>Notes</p>}
            </div>
            <button id={classes.CreateNote} onClick={clickHandler}>Create Note</button>
        </header>
    );
};

export default Header;

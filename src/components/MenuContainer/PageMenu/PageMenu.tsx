import { useSelector, useDispatch } from 'react-redux';

import State from '../../../store/combinedState';
import AddButton from '../AddButton/AddButton';
import MenuItem from '../MenuItem/MenuItem';
import classes from './PageMenu.module.css';

interface PropTypes {
    toggle: () => void;
}

const PageMenu = (props: PropTypes) => {
    const pages = useSelector((state: State) => state.page.pages);
    const currentPageId = useSelector((state: State) => state.page.currentPageId);
    const dispatch = useDispatch();

    const itemClickHandler = (id: string) => {
        props.toggle();
        dispatch({ type: 'SHOW_PAGE', id });
        dispatch({ type: 'HIDE_BOARD', id });
    };

    return (
        <div id={classes.PageMenu}>
            <ul>
                <AddButton type='Page' />
                {pages.filter(item => item.id !== currentPageId).map(item => {
                    return (
                        <li key={item.id}>
                            <MenuItem
                                title={item.title || 'Untitled'}
                                click={() => itemClickHandler(item.id)}
                                delete={{ type: 'DELETE_PAGE', id: item.id }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PageMenu;

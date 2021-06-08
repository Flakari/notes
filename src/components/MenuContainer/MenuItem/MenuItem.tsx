import { useState, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';

import OpenMenuButton from '../../OpenMenuButton/OpenMenuButton';
import classes from './MenuItem.module.css';

interface PropTypes {
    title: string;
    click: () => void;
    delete: { type: string, id: string };
    type: 'page' | 'board';
}

const MenuItem = (props: PropTypes) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();

    const toggleMenu = (e: SyntheticEvent) => {
        e.stopPropagation();
        setShowMenu(prevState => !prevState);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    const deleteItem = (e: SyntheticEvent) => {
        e.stopPropagation();
        dispatch(props.delete)
    }

    return (
        <div onMouseLeave={closeMenu} className={classes.MenuItem} onClick={props.click}>
            <div className={props.type === 'page' ? classes.MenuPageImage : classes.MenuBoardImage}></div>
            <p>{props.title}</p>
            <OpenMenuButton menuClass={classes.MenuItemButton} click={toggleMenu} />
            {showMenu ? <div onClick={deleteItem} className={classes.SubMenu}>Delete</div> : null}
        </div>
    );
};

export default MenuItem;

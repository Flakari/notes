import { useState } from 'react';

import classes from '../EditorButtonContainer.module.css';

interface PropTypes {
    children: any;
    name: string;
    icon: string;
}

const EditorCategory = (props: PropTypes) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    };

    return (
        <>
            {showMenu ? <div className={classes.CategoryMenu}>{props.children}</div> : null}
            <button key={props.name} onClick={toggleMenu} className={[classes.EditorButton, `fas fa-${props.icon}`].join(' ')}></button>
        </>
    );
};

export default EditorCategory;

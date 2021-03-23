import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Title.module.css';
import CombinedState from '../../store/combinedState';

const Title = () => {
    const currentId = useSelector((state: CombinedState) => state.page.currentPageId);
    const title = useSelector((state: CombinedState) => state.page.pages.filter((item: any) => item.id === currentId)[0].title);
    const dispatch = useDispatch();
    const [titleValue, setTitleValue] = useState(title || 'Untitled');
    const inputRef = useRef<HTMLInputElement>(null);

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
        dispatch({ type: 'SAVE_PAGE_TITLE', id: currentId, title: e.target.value });
    };

    const blurHandler = () => {
        if (inputRef.current) inputRef.current.scrollLeft = 0;
    }

    return (
        <input ref={inputRef} id={classes.TitleInput} type="text" value={titleValue} onChange={titleChangeHandler} placeholder='Untitled' onBlur={blurHandler} />
    );
};

export default Title;
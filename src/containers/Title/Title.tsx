import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Title.module.css';
import CombinedState from '../../store/combinedState';

interface PropTypes {
    id: string;
}

const Title = (props: PropTypes) => {
    const title = useSelector((state: CombinedState) => {
        if (state.page.currentPageId !== '') return state.page.pages.filter((item: any) => item.id === props.id)[0].title;
        if (state.board.currentBoardId !== '') return state.board.boards[props.id].title;
    });
    const type = useSelector((state: CombinedState) => {
        if (state.page.currentPageId !== '') return 'page';
        if (state.board.currentBoardId !== '') return 'board';
    });
    const dispatch = useDispatch();
    const [titleValue, setTitleValue] = useState(title || 'Untitled');
    const inputRef = useRef<HTMLInputElement>(null);

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
        if (type === 'page') dispatch({ type: 'SAVE_PAGE_TITLE', id: props.id, title: e.target.value });
        if (type === 'board') dispatch({ type: 'SAVE_BOARD_TITLE', title: e.target.value });
    };

    const blurHandler = () => {
        if (inputRef.current) inputRef.current.scrollLeft = 0;
    }

    return (
        <input ref={inputRef} id={classes.TitleInput} type="text" value={titleValue} onChange={titleChangeHandler} placeholder='Untitled' onBlur={blurHandler} />
    );
};

export default Title;

import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './NoteTitle.module.css';
import { State } from '../../store/reducer';

const NoteTitle = () => {
    const currentId = useSelector((state: State) => state.currentNoteId);
    const title = useSelector((state: State) => state.notes.filter(item => item.id === currentId)[0].title);
    const dispatch = useDispatch();
    const [titleValue, setTitleValue] = useState(title || 'Untitled');
    const inputRef = useRef<HTMLInputElement>(null);

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
        dispatch({ type: 'SAVE_TITLE', id: currentId, title: e.target.value });
    };

    const blurHandler = () => {
        if (inputRef.current) inputRef.current.scrollLeft = 0;
    }

    return (
        <input ref={inputRef} id={classes.TitleInput} type="text" value={titleValue} onChange={titleChangeHandler} placeholder='Untitled' onBlur={blurHandler} />
    );
};

export default NoteTitle;

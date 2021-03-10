import { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './NoteTitle.module.css';
import { State } from '../../store/reducer';

interface PropTypes {
    id: string;
    saveTitle: (id: string, title: string) => {};
};

const NoteTitle = (props: PropTypes) => {
    const title = useSelector((state: State) => state.notes.filter(item => item.id === props.id)[0].title);
    const [titleValue, setTitleValue] = useState(title || 'Untitled');

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
        props.saveTitle(props.id, e.target.value);
    };

    return (
        <input id={classes.TitleInput} type="text" value={titleValue} onChange={titleChangeHandler} placeholder='Untitled' />
    );
};

export default NoteTitle;

import { useSelector, useDispatch } from 'react-redux';

import EditorContainer from '../EditorContainer/EditorContainer';
import State from '../../store/combinedState';
import classes from './PageContainer.module.css';
import { useCallback } from 'react';

const PageContainer = () => {
    const id = useSelector((state: State) => state.page.currentPageId);
    const content = useSelector((state: State) => state.page.pages.filter((item: any) => item.id === id)[0].content);
    const dispatch = useDispatch();

    const saveNote = useCallback((id: string, content: string) => {
        dispatch({ type: 'SAVE_PAGE', id, content });
    }, [dispatch]);

    return (
        <div id={classes.PageContainer}>
            <EditorContainer
                id={id}
                editorClass={classes.PageEditorContainer}
                editorButtonClass={classes.PageEditorButtonContainer}
                saveNote={saveNote}
                content={content}
                editorButtonSelection='full'
            />
        </div>
    );
};

export default PageContainer;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EditorContainer from '../EditorContainer/EditorContainer';
import State from '../../store/combinedState';
import classes from './PageContainer.module.css';
import { useCallback } from 'react';
import { fullOverallLayout, mediumCompactLayout, smallCompactLayout } from '../EditorButtonContainer/EdtiorButtonInformation/EditorButtonLayouts';

const PageContainer = () => {
    const [layout, setLayout] = useState<any[]>([]);
    const id = useSelector((state: State) => state.page.currentPageId);
    const content = useSelector((state: State) => state.page.pages.filter((item: any) => item.id === id)[0].content);
    const dispatch = useDispatch();

    const checkWindowWidth = (width: number) => {
        const medium = 900;
        const small = 500;

        if (width >= medium) {
            return fullOverallLayout;
        } else if (width < medium && width >= small) {
            return mediumCompactLayout;
        } else {
            return smallCompactLayout;
        }
    };

    useEffect(() => {
        const setLayoutWidth = () => setLayout(checkWindowWidth(window.innerWidth));

        setLayoutWidth();
        window.addEventListener('resize', setLayoutWidth);

        return () => {
            window.removeEventListener('resize', setLayoutWidth);
        }
    }, []);

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
                editorButtonSelection={layout}
            />
        </div>
    );
};

export default PageContainer;

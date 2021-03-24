import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from '../../store/pageReducer';
import classes from './PageMenu.module.css';

interface PropTypes {
    props: { containerToggle: () => void };
    showPage: (id: string) => {};
    deletePage: (id: string) => {};
    pages: Page[];
    currentPageId: string;
    hideBoard: () => {};
}

const PageMenu = (props: PropTypes) => {
    const itemClickHandler = (id: string) => {
        props.showPage(id);
        props.hideBoard();
        props.props.containerToggle();
    };

    return (
        <div className={classes.PageMenu}>
            <ul>
                {props.pages.filter(item => item.id !== props.currentPageId).map(item => {
                    return (
                        <li key={item.id}>
                            <span onClick={() => itemClickHandler(item.id)}>{item.title || 'Untitled'}</span>
                            <button className={classes.btn} onClick={() => props.deletePage(item.id)}>X</button>
                        </li>
                    );
                })}
            </ul>
        </div>

    );
};

const mapStateToProps = (state: any) => {
    return {
        pages: state.page.pages,
        currentPageId: state.page.currentPageId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        showPage: (id: string) => dispatch({ type: 'SHOW_PAGE', id }),
        deletePage: (id: string) => dispatch({ type: 'DELETE_PAGE', id }),
        hideBoard: () => dispatch({ type: 'HIDE_BOARD' })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageMenu);

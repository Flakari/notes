import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Header from './components/Header/Header';
import PageContainer from './containers/PageContainer/PageContainer';
import MenuContainer from './components/MenuContainer/MenuContainer';
import NoteBoard from './containers/NoteBoard/NoteBoard';


interface PropTypes {
	currentPageId: string;
	showEditor: boolean;
	currentBoardId: string;
	showBoard: boolean;
};

const App = (props: PropTypes) => {
	const [appClasses, setAppClasses] = useState(['App'])

	useEffect(() => {
		const baseClass = ['App'];

		if (props.showBoard) {
			setAppClasses(baseClass.concat('Board'));
		} else if (props.showEditor) {
			setAppClasses(baseClass.concat('Page'));
		} else {
			setAppClasses(baseClass);
		}
	}, [props.showBoard, props.showEditor]);

	return (
		<div className={appClasses.join(' ')}>
			<Header />
			<MenuContainer />
			{(props.showEditor && props.currentPageId !== '') && <PageContainer key={props.currentPageId} />}
			{(props.showBoard && props.currentBoardId !== '') && <NoteBoard key={props.currentBoardId} id={props.currentBoardId} />}
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		currentPageId: state.page.currentPageId,
		showEditor: state.page.showEditor,
		showBoard: state.board.showBoard,
		currentBoardId: state.board.currentBoardId
	};
};

export default connect(mapStateToProps)(App);

import './App.css';
import Header from './components/Header/Header';
import EditorContainer from './containers/EditorContainer/EditorContainer';
import MenuContainer from './components/MenuContainer/MenuContainer';
import NoteBoard from './containers/NoteBoard/NoteBoard';

import { connect } from 'react-redux';

interface PropTypes {
	currentPageId: string;
	showEditor: boolean;
	currentBoardId: string;
	showBoard: boolean;
};

function App(props: PropTypes) {
	return (
		<div className="App">
			<Header />
			<MenuContainer />
			{(props.showEditor && props.currentPageId !== '') && <EditorContainer key={props.currentPageId} id={props.currentPageId} />}
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

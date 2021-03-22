import './App.css';
import Header from './components/Header/Header';
import EditorContainer from './containers/EditorContainer/EditorContainer';
import MenuContainer from './components/MenuContainer/MenuContainer';
import NoteBoard from './containers/NoteBoard/NoteBoard';

import { connect } from 'react-redux';

interface PropTypes {
	currentNoteId: string;
	showEditor: boolean;
};

function App(props: PropTypes) {
	return (
		<div className="App">
			<Header />
			<MenuContainer />
			{(props.showEditor && props.currentNoteId !== '') && <EditorContainer key={props.currentNoteId} id={props.currentNoteId} />}
			<NoteBoard />
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		currentNoteId: state.currentNoteId,
		showEditor: state.showEditor
	};
};

export default connect(mapStateToProps)(App);

import './App.css';
import Header from './components/Header/Header';
import EditorContainer from './containers/EditorContainer/EditorContainer';
import NotesContainer from './components/NotesContainer/NotesContainer';

import { connect } from 'react-redux';

interface PropTypes {
	currentNoteId: string;
	showEditor: boolean;
};

function App(props: PropTypes) {
	return (
		<div className="App">
			<Header />
			<NotesContainer />
			{(props.showEditor && props.currentNoteId !== '') && <EditorContainer key={props.currentNoteId} id={props.currentNoteId} />}
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

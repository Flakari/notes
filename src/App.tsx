import './App.css';
import Header from './components/Header/Header';
import EditorContainer from './containers/EditorContainer/EditorContainer';

import { useState } from 'react';
import { connect } from 'react-redux';
import { Note } from './store/reducer';

interface PropTypes {
	notes: Note[];
	createNewNote: () => {};
}

function App(props: PropTypes) {
	const [showEditor, setShowEditor] = useState(!!localStorage.getItem('notes'));

	const createNote = () => {
		setShowEditor(true);
		props.createNewNote();
	}

	return (
		<div className="App">
			<Header />
			{!showEditor ? <button onClick={createNote}>New Note</button> : <EditorContainer id={props.notes[props.notes.length - 1]?.id} />}
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		notes: state.notes
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		createNewNote: () => dispatch({ type: 'CREATE_NOTE' })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

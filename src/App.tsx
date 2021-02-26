import './App.css';
import Header from './components/Header/Header';
import EditorContainer from './containers/EditorContainer/EditorContainer';

import { connect } from 'react-redux';
import { Note } from './store/reducer';

interface PropTypes {
	notes: Note[];
	showEditor: boolean;
};

function App(props: PropTypes) {
	return (
		<div className="App">
			<Header />
			{props.showEditor && <EditorContainer id={props.notes[props.notes.length - 1]?.id} />}
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		notes: state.notes,
		showEditor: state.showEditor
	};
};

export default connect(mapStateToProps)(App);

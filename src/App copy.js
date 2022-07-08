/** @format */

import './App.css';
import React, { Component } from 'react';
import firebase from './Components/Helpers/firebaseConfig';
import {
	collection,
	getDocs,
	addDoc,
	onSnapshot,
	doc,
	query,
	where,
} from 'firebase/firestore';

import DocksData from './Components/DocksData';

const db = firebase.dbFireStore;

class App extends Component {
	constructor() {
		super();
		this.state = {
			selectedNodeIndex: null,
			selectedNote: null,
			notes: [],
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		// this.setState = this.setState.bind(this);
	}

	componentDidMount() {
		//getting documents from firestore once
		const getDocsFromFS = async function () {
			const querySnapshot = await getDocs(collection(db, 'notes'));
			querySnapshot.forEach((doc) => {
				const document = doc.data();
				// console.log(`${doc.id} => ${document.title}, ${document.body}`);
			});
		};
		//callback
		getDocsFromFS();

		const q = query(collection(db, 'notes'));
		const unsubscribe = onSnapshot(q, (collectionsUpdate) => {
			const notes = [];

			console.log('before forEch');

			collectionsUpdate.forEach((doc) => {
				const data = doc.data();
				data['id'] = doc.id;
				notes.push(data);

				console.log('in forEach', notes);
			});

			console.log('notes after pushing', notes);
			return notes;
		});
		console.log('unsubsribe', unsubscribe);
		this.setState({ notes: unsubscribe });
	}

	render() {
		return (
			<div>
				<h1>Hello Word</h1>
				https://youtu.be/I250xdtUvy8?list=PLyDE36G6PL48BO1vQoJGbpyWiGCtU0iNY&t=1257
				<DocksData notes={this.state.notes} />
			</div>
		);
	}
}

export default App;

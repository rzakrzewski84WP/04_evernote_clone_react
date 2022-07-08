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
} from 'firebase/firestore';

const db = firebase.dbFireStore;

class App extends Component {
	constructor() {
		super();
		this.state = {
			selectedNodeIndex: null,
			selectedNote: null,
			notes: null,
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	render() {
		return (
			<div>
				<h1>Hello Word</h1>
				https://youtu.be/I250xdtUvy8?list=PLyDE36G6PL48BO1vQoJGbpyWiGCtU0iNY&t=1257
			</div>
		);
	}

	componentDidMount() {
		console.log('hi');
		const getDocsFromFS = async function () {
			const querySnapshot = await getDocs(collection(db, 'notes'));
			querySnapshot.forEach((doc) => {
				const document = doc.data();
				console.log(`${doc.id} => ${document.title}, ${document.body}`);
			});
		};
		getDocsFromFS();

		const unsubscribe = onSnapshot(collection(db, 'notes'), (doc) => {
			console.log('Current data: ', doc.data());
		});
	}
}

export default App;

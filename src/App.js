/** @format */

import './App.css';
import React, { Component } from 'react';
import firebase from './Components/Helpers/firebaseConfig';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';

import DocksData from './Components/DocksData';

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
		this.watchFireStore = this.watchFireStore.bind(this);
		this.setState = this.setState.bind(this);
	}

	watchFireStore() {
		const q = query(collection(db, 'notes'));
		const unsubscribe = onSnapshot(q, async (collectionsUpdate) => {
			console.log(collectionsUpdate);
			const documents = await collectionsUpdate.docs.map((_doc) => {
				const data = _doc.data();
				data['id'] = _doc.id;
				return data;
			});
			console.log('documents', documents);

			console.log('this.state before setState', this.state);

			this.setState(
				{ notes: documents, selectedNote: true, selectedNodeIndex: true },
				function () {
					console.log('this.state in setState', this.state);
				}
			);

			console.log('this.state after setState', this.state);
		});
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
		this.watchFireStore();
	}

	render() {
		return (
			<div>
				<h1>Hello Word</h1>
				https://youtu.be/I250xdtUvy8?list=PLyDE36G6PL48BO1vQoJGbpyWiGCtU0iNY&t=1257
				<DocksData notes={this.state} />
			</div>
		);
	}
}

export default App;

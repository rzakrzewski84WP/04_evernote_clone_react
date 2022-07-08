/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDEAy30tUasXEuP2uLajilyR8KNaeVAn7U',
	authDomain: 'sdanews-acd6d.firebaseapp.com',
	databaseURL:
		'https://sdanews-acd6d-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'sdanews-acd6d',
	storageBucket: 'gs://sdanews-acd6d.appspot.com',
	messagingSenderId: '681013709198',
	appId: '1:681013709198:web:21f82d36857b9377917cdf',
	measurementId: 'G-F00EFMLNNV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const dbFireStore = getFirestore(app);
const storage = getStorage(app);

export default {
	app,
	analytics,
	auth,
	database,
	dbFireStore,
	storage,
};

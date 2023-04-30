import ReactObserver from 'react-event-observer';

import { auth } from '../../firebaseConfig';

export const firebaseObserver = ReactObserver();

export const loggedIn = () => !!auth.currentUser;

auth.onAuthStateChanged(() => {
  firebaseObserver.publish('authStateChanged', loggedIn());
});

import React from "react";
import {auth} from '../../firebaseConfig'
import {onAuthStateChanged} from 'firebase/auth';
import ReactObserver from 'react-event-observer';


export const firebaseObserver = ReactObserver();

auth.onAuthStateChanged(function(user) {
    firebaseObserver.publish("authStateChanged", loggedIn())
})

export function loggedIn() {
    return !!auth.currentUser;
}
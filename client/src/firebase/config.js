import firebase from 'firebase/app'

export const app_name = 'hdherokima'

export const config = {
  apiKey: "AIzaSyDLEQVDNE6w7GNtks11iZjla42t7D1g_PQ",
  authDomain: `${app_name}.firebaseapp.com`,
  databaseURL: `https://${app_name}.firebaseio.com`,
  projectId: `${app_name}`,
  storageBucket: `${app_name}.appspot.com`,
  messagingSenderId: "452115469138"
}

firebase.initializeApp(config)

export const fire = firebase




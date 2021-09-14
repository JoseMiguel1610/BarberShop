import 'react-native-gesture-handler'

import React, { useEffect } from 'react'
import Routes_init from './Routes_init'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./app/reducers";
import SplashScreen from "react-native-splash-screen";

import BackgroundService from 'react-native-background-actions';

const store = createStore(
  reducers, //todo los reducers
  {}, //estado inicial
  applyMiddleware(reduxThunk) //Middleware
);




export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Routes_init />
    </Provider>
  )
}
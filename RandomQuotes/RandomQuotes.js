/*import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);*/
import { createRoot } from 'react-dom/client';

function NavigationBar() {
    // TODO: Actually implement a navigation bar
    return <h1>Hello from React!</h1>;
  }
  
  const domNode = document.getElementById('quote-box');
  //const root = createRoot(domNode);
  domNode.render(<NavigationBar />);



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
function MyApp() {
    return <h1>Hello, world!</h1>;
  }

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);



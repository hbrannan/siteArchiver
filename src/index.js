import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AppScreen from './containers/AppScreen'
import combined_reducer from './reducers/combined_reducer'

let store = createStore(
  combined_reducer,
  applyMiddleware(
    thunkMiddleware
  )
);

//F O R    D E V
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <AppScreen/>
  </Provider>,
  document.getElementById('root')
);

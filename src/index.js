import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import todoApp from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import thunk from 'redux-thunk';
import {get} from './Net/net';

const logger = ({dispatch, getState}) => (next) => (action) => {
  console.group(action.type);
  console.log('state before dispatch', getState());
  let nextAction = next(action);
  console.log('state after dispatch', getState());
  console.groupEnd(action.type);
  return nextAction
};

const store = createStore(todoApp, applyMiddleware(thunk, logger));

const receiveFetch = url => dispatch => {
  dispatch({
    type: 'LOAD_TODO',
    payload: {
      isFetching: true,
    },
  })
  return get(url).then(res => {
    dispatch({
      type: 'LOAD_TODO',
      payload: {
        isFetching: false,
        todolist: res,
      }
    })
  })
}

store.dispatch(receiveFetch('/todolist'));

// get('/todolist').then(res => {
//     store.dispatch({
//         type: 'LOAD_TODO',
//         payload: {
//             todolist: res
//         }
//     })
// });

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();

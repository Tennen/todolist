import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import todoApp from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import thunk from 'redux-thunk';
import { loadTodos } from './load-todo';

const logger = ({dispatch, getState}) => (next) => (action) => {
  console.group(action.type);
  console.log('state before dispatch', getState());
  let nextAction = next(action);
  console.log('state after dispatch', getState());
  console.groupEnd(action.type);
  return nextAction
};

const fetchAPI = ({dispatch, getState}) => (next) => (action) => {
  const {isAPI, promise} = action.payload;
  if(isAPI) {
    dispatch({ type: action.type, payload: { isFetching: true } });
      promise().then(res => {
        const nextAction = { type: action.type, payload: { list: res, isFetching: false } };
        return next(nextAction);
      }).catch((err) => {
        const errorMessage = new Error(err);
        alert(errorMessage);
      dispatch({ type: action.type, payload: errorMessage, error: true })
    })
  }
  return next(action);
};

const store = createStore(todoApp, applyMiddleware(fetchAPI, thunk, logger));

// const receiveFetch = url => dispatch => {
//   dispatch({
//     type: 'LOAD_TODO',
//     payload: {
//       isFetching: true,
//     },
//   });
//   return get(url).then(res => {
//     dispatch({
//       type: 'LOAD_TODO',
//       payload: {
//         isFetching: false,
//         todolist: res,
//       }
//     })
//   })
// };

store.dispatch(loadTodos());

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();

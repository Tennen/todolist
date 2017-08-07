import {combineReducers} from 'redux';
import _ from 'ramda';

const showDoneList = (show = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW':
      return !show;
    default:
      return show;
  }
};

const todos = (state = {isFetching: false, list: []}, action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      if(action.error){
        return { ...state, isFetching: false };
      }
      return { ...state, ...action.payload };

    case 'ADD_TODO':
      if(action.payload.isFetching) {
        return Object.assign({}, state, {isFetching: true});
      }
      const {message, id} = action.payload;
      return Object.assign({}, state, {list: [...state.list, {text: message, completed: false, ID: id}]})

    case 'TOGGLE_TODO':
      const findTargetCompleted = (todo) => {
        if (todo.ID === action.payload.cid) {
          return Object.assign({}, todo, {completed: !todo.completed});
        }
        return todo;
      };
      return Object.assign({}, state, {list: _.map(findTargetCompleted)(state.list)});

    case 'EDIT_TODO':
      const {content, cid} = action.payload;
      const findTargetContent = (todo) => {
        if (todo.ID === cid) {
          return Object.assign({}, todo, {text: content});
        }
        return todo;
      };
      return Object.assign({}, state, {list: _.map(findTargetContent)(state.list)});
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  showDoneList,
});

export default todoApp;
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

const todos = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TODO':
            return [
                ...state,
                ...action.data.todolist,
            ];

        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.data.message,
                    completed: false,
                    ID: action.data.id,
                }
            ];

        case 'TOGGLE_TODO':
            const {cid} = action.data;
            const findTargetCompleted = (todo) => {
                if (todo.ID == cid) {
                    return Object.assign({}, todo, {completed: !todo.completed});
                }
                return todo;
            };
            return _.map(findTargetCompleted)(state);

        case 'EDIT_TODO':
            const {content} = action.data;
            const findTargetContent = (todo) => {
                if (todo.ID == action.data.cid) {
                    return Object.assign({}, todo, {text: action.data.content});
                }
                return todo;
            };
            return _.map(findTargetContent)(state);
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    showDoneList,
});

export default todoApp;
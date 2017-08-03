import { combineReducers } from 'redux';
import _ from 'ramda';

const showDoneList = (state = { show: false }, action) => {
	switch(action.type) {
		case 'TOGGLE_SHOW': 
			return Object.assign({}, state, { show : !state.show });
		default:
			return state;
	}
}

const todos = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_TODO':
			return [
				...state,
				...action.data.todolist,
			]

		case 'ADD_TODO': 
			return [
				...state,
				{
					text: action.data.message,
					completed: false,
					ID: action.data.id,
				}
			]

		case 'TOGGLE_TODO':
			const { cid } = action.data;
			const findtarget = (todo) => {
				if(todo.ID == cid){
					return Object.assign({}, todo, { completed: !todo.completed });
				}
				return todo;
			}
			return _.map(findtarget)(state);
		default:
			return state;
	}
}

const todoApp = combineReducers({
	todos,
	showDoneList,
})

export default todoApp;
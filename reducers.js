import { combineReducers } from 'redux';

todoApp = (state =[], action){
	switch (action.type) {
		case ADD_TODO: 
			return [
				...state,
				{
					text: action.text,
					complete: false
				}
			]
	}
}
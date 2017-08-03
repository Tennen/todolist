import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Todo from './todo';
import { map, filter, propEq, compose } from 'ramda';

class TodoList extends Component {
	render(){
		const { todos, togglecompleted, edittodo } = this.props;
		const objToItem = (todo) => {
			return (<Todo
				cid={ todo.ID }
				key={ todo.ID }
				content={ todo.text }
				completed={ todo.completed }
	        	togglecompleted={ (cid, completed) => { togglecompleted(cid, completed) } }
	        	edittodo={ (cid, content) => { edittodo(cid, content) } }
			/>)
		}
		const list = compose(
						map(objToItem), 
						filter(
							propEq("completed", this.props.completed)
						)
					)(todos);
		return (
			<List style={{flex: 1}}>
				<Subheader>{this.props.completed ? "TodoList" : "DoneList"}</Subheader>
				{
					list
				}
			</List>
		)
	}
}

export default TodoList
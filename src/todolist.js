import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Todo from './todo';
import { map, filter, propEq, compose } from 'ramda';

class TodoList extends Component {
	render(){
		const { dispatch, todos } = this.props;
		const objToItem = (todo) => {
			return (<Todo
				cid={ todo.ID }
				key={ todo.ID }
				content={ todo.text }
				completed={ todo.completed }
			/>)
		}
		let list = compose(
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
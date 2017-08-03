import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { post } from './Net/net';

class Todo extends Component {
	toggleCompleted = (e, checked) => {
		const { completed, content, cid, dispatch } = this.props;
		post('/toggle', { "ID": cid , "complete": !completed })
			.then(res => {
				if(!res.err){
					dispatch({
						type: 'TOGGLE_TODO',
						data: {
							cid,
						}
					})
				}
			})
	}
	render(){
		const { completed, content } = this.props;

		return (
			<ListItem 
				leftCheckbox={<Checkbox 
					checked={ completed ? true : false }
					onCheck={ this.toggleCompleted }/>
				}
				primaryText={ content }
				style={ completed ? {textDecoration: 'line-through', color: 'gray'} : {} }
			/>
		)
	}
}

export default Todo
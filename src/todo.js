import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { post } from './Net/net';

class Todo extends Component {
	state = {
		completed: this.props.completed,
		content: this.props.content,
		cid: this.props.cid,
	}
	toggleCompleted = (e, checked) => {
		const check = this.state.checked? 0: 1;
		post('/toggle', { "ID": this.state.cid , "complete": check})
			.then(res => {
				if(!res.err){
					this.props.dispatch({
						type: 'TOGGLE_TODO',
						data: {
							cid: this.state.cid,
							complete: check,
						}
					})
				}
			})
	}
	render(){
		const { completed } = this.state;

		return (
			<ListItem 
				leftCheckbox={<Checkbox 
					checked={ completed ? true : false }
					onCheck={ this.toggleCompleted }/>
				}
				primaryText={ this.state.content }
				style={ completed ? {textDecoration: 'line-through', color: 'gray'} : {} }
			/>
		)
	}
}

export default Todo
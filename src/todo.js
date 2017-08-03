import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { post } from './Net/net';

class Todo extends Component {
	toggleCompleted = (e, checked) => {
		const { completed, content, cid, togglecompleted } = this.props;
		togglecompleted(cid, completed)
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
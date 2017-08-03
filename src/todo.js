import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { post } from './Net/net';

class Todo extends Component {
	state = {
		switch: null
	}
	toggleCompleted = (e, checked) => {
		if(this.state.switch){
			clearTimeout(this.state.switch);
			this.setState({
				switch: null
			})
			return;
		}
		const timer = setTimeout( () => {
			const { completed, content, cid, togglecompleted } = this.props;
			togglecompleted(cid, completed)
			this.setState({
				switch: null
			})
		},300)
		this.setState({
			switch: timer
		})
	}
	testDbClick = () => {
		alert(1);
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
				onDoubleClick={ this.testDbClick }
			/>
		)
	}
}

export default Todo
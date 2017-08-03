import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class Todo extends Component {
	state = {
		switch: null,
		isEditing: false,
		content: '',
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
		this.setState({
			isEditing: true
		})
	}
	handleContentChange = (e, value) => {
		this.setState({
			content: value
		})
	}
	handleEnter = (e) => {
		const { cid, edittodo } = this.props
		if(e.key === 'Enter'){
			edittodo(cid, this.state.content)
			this.setState({
				isEditing: false
			})
		}
	}
	render(){
		const { completed, content } = this.props;

		return this.state.isEditing ? 
			(<TextField 
				hintText={ content }
				onChange={ this.handleContentChange }
				onKeyUp={ this.handleEnter }
		    />)
			: (<ListItem 
				leftCheckbox={<Checkbox 
					checked={ completed ? true : false }
					onCheck={ this.toggleCompleted }/>
				}
				primaryText={ content }
				style={ completed ? {textDecoration: 'line-through', color: 'gray'} : {} }
				onDoubleClick={ this.testDbClick }
			/>)
	}
}

export default Todo
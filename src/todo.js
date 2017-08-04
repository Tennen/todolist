import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { withState, withProps, withHandlers, branch, compose, renderComponent, pure } from 'recompose';

const isEditing = compose(
	withState('isEditing', 'toggleEditing', false),
	withHandlers({
		onDbClick: ({ isEditing, toggleEditing }) => () => {
			toggleEditing(!isEditing);
		}
	})
)

const addEditing = compose(
	withState('message', 'changeMessage', ''),
	withHandlers({
		handleContentChange: ({ changeMessage }) => (e, value) => {
			changeMessage(value);
		},
		handleEnter: ({ cid, edittodo, message, toggleEditing }) => (e) => {
			if(e.key === 'Enter'){
				edittodo(cid, message)
				toggleEditing(false);
			}
		},
	})
)

const toggleDone = compose(
	withState('isSwitchOn', 'toggleSwitch', null),
	withHandlers({
		toggleCompleted: ({ completed, content, cid, togglecompleted, isSwitchOn, toggleSwitch }) => (event) => {
			if(isSwitchOn){
				clearTimeout(isSwitchOn);
				toggleSwitch(!isSwitchOn);
				return;
			}
			const timer = setTimeout( () => {
				togglecompleted(cid, completed);
				toggleSwitch(null);
			},300)
			toggleSwitch(timer);
		}
	})
)

const childTextField = addEditing( ({ content, handleContentChange, handleEnter }) => 
	<TextField 
		hintText={ content }
		onChange={ handleContentChange }
		onKeyUp={ handleEnter }
    />
)


const childListItem = toggleDone( ({ completed, toggleCompleted, content, onDbClick }) => 
	<ListItem 
		leftCheckbox={<Checkbox 
			checked={ completed ? true : false }
			onCheck={ toggleCompleted }/>
		}
		primaryText={ content }
		style={ completed ? {textDecoration: 'line-through', color: 'gray'} : {} }
		onDoubleClick={ onDbClick }
	/>
)


const addBranch = branch(
	({ isEditing }) => isEditing ? true : false,
	renderComponent(childTextField),
	renderComponent(childListItem),
)

const enhance = compose(isEditing, addBranch);

const Todo = enhance( () => 
	<div>
	</div>
)
console.log(Todo)

export default Todo



// class Todo extends Component {
// 	state = {
// 		switch: null,
// 		isEditing: false,
// 		content: '',
// 	}
// 	toggleCompleted = (e, checked) => {
// 		if(this.state.switch){
// 			clearTimeout(this.state.switch);
// 			this.setState({
// 				switch: null
// 			})
// 			return;
// 		}
// 		const timer = setTimeout( () => {
// 			const { completed, content, cid, togglecompleted } = this.props;
// 			togglecompleted(cid, completed)
// 			this.setState({
// 				switch: null
// 			})
// 		},300)
// 		this.setState({
// 			switch: timer
// 		})
// 	}
// 	testDbClick = () => {
// 		this.setState({
// 			isEditing: true
// 		})
// 	}
// 	handleContentChange = (e, value) => {
// 		this.setState({
// 			content: value
// 		})
// 	}
// 	handleEnter = (e) => {
// 		const { cid, edittodo } = this.props
// 		if(e.key === 'Enter'){
// 			edittodo(cid, this.state.content)
// 			this.setState({
// 				isEditing: false
// 			})
// 		}
// 	}
// 	render(){
// 		const { completed, content } = this.props;

// 		return this.state.isEditing ? 
// 			(<TextField 
// 				hintText={ content }
// 				onChange={ this.handleContentChange }
// 				onKeyUp={ this.handleEnter }
// 		    />)
// 			: (<ListItem 
// 				leftCheckbox={<Checkbox 
// 					checked={ completed ? true : false }
// 					onCheck={ this.toggleCompleted }/>
// 				}
// 				primaryText={ content }
// 				style={ completed ? {textDecoration: 'line-through', color: 'gray'} : {} }
// 				onDoubleClick={ this.testDbClick }
// 			/>)
// 	}
// }

// export default Todo
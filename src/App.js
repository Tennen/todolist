import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './todolist';
import Addtodo from './addtodo';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { get, post } from './Net/net';

class App extends Component {
	showDoneList = () => {
		this.props.dispatch({
			type: "TOGGLE_SHOW",
		})
	}
	addToDo = (msg) => {
		post('/addtodo', { "content": msg })
			.then(res => {
				if(!res.err){
					this.props.dispatch({
						type: 'ADD_TODO', 
						data: {
							message: msg, 
							completed: false,
							id: res.id
						}
					})
				}
			})
	}
	toggleCompleted = (cid, completed) => {
		post('/toggle', { "ID": cid , "completed": !completed })
			.then(res => {
				if(!res.err){
					this.props.dispatch({
						type: 'TOGGLE_TODO',
						data: {
							cid,
						}
					})
				}
			})
	}
	editTodo = (cid, content) => {
		post('/edit', { "ID": cid , "text": content })
			.then(res => {
				if(!res.err){
					this.props.dispatch({
						type: 'EDIT_TODO',
						data: {
							cid,
							content,
						}
					})
				}
			})
	}
	componentWillMount(){
		get('/todolist').then(res=>{
			this.props.dispatch({
				type: 'LOAD_TODO',
				data: {
					todolist: res
				}
			})
		})
	}
	render() {
	    const { dispatch, todos, showDoneList } = this.props;
	    return (
	      <div style={ { width: '480px' } }>
	        <Addtodo addtodo={ (msg) => { this.addToDo(msg) } } />
	        <TodoList 
	        	completed={ false } 
	        	todos={ todos }
	        	togglecompleted={(cid, completed) => { this.toggleCompleted(cid, completed) }}
	        	edittodo={ (cid, content) => { this.editTodo(cid, content) } }
	       	/>
	        <Chip 
	        	style={ { marginLeft: '50px' } }
	        	onClick={this.showDoneList}
	        	onTouchTap={this.showDoneList}
	        >
	        	show donelist
	        </Chip>
	        { showDoneList.show? <TodoList 
	        						completed={ true } 
	        						todos={ todos }
	        						togglecompleted={(cid, completed) => { this.toggleCompleted(cid, completed) }}
	        					/> 
	        	: null }
	      </div>
	    );
	}
}

export default connect(state => ({
	showDoneList : state.showDoneList,
	todos: state.todos
})
)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './todolist';
import Addtodo from './addtodo';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

class App extends Component {
	showDoneList = () => {
		this.props.dispatch({
			type: "TOGGLE_SHOW",
		})
	}
	render() {
	    const { dispatch, todos, showDoneList } = this.props;
	    return (
	      <div style={ { width: '480px' } }>
	        <Addtodo />
	        <TodoList 
	        	completed={ false } 
	        	 todos={ todos }
	       	/>
	        <Chip 
	        	style={ { marginLeft: '50px' } }
	        	onClick={this.showDoneList}
	        	onTouchTap={this.showDoneList}
	        >
	        	show donelist
	        </Chip>
	        { showDoneList.show? <TodoList completed={ true } todos={ todos }/> : null }
	      </div>
	    );
	}
}

export default connect(state => ({
	showDoneList : state.showDoneList,
	todos: state.todos
})
)(App);

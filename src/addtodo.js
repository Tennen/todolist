import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class AddTodo extends Component {
	state = {
		todo: [],
		message: ''
	}
	handleUpdateInput = (value) => {
		this.setState({
			message: value
		})
	}
	submitInput = () => {
		const { message } = this.state;
		const { addtodo } = this.props;
		if(!message){
			return
		}
		addtodo(message);
		this.setState({
			message: ''
		})
	}
	render() {
		return (
			<div>
				<AutoComplete 
					hintText="what to do" 
					dataSource={this.state.todo} 
					searchText={this.state.message}
					floatingLabelText="what to do" 
					onUpdateInput={this.handleUpdateInput}
					style={{width: '300px'}}
				>
				</AutoComplete>
				<RaisedButton label="submit" onClick={this.submitInput}/>
			</div>
		)
	}
}
export default AddTodo
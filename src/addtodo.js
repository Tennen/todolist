import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { post } from './Net/net';

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
		if(!this.state.message){
			return
		}
		let message = this.state.message;
		post('/addtodo', { "content": this.state.message })
			.then(res => {
				console.log(res)
				if(!res.err){
					this.props.dispatch({
						type: 'ADD_TODO', 
						data: {
							message, 
							complete: 0,
							id: res.id
						}
					})
				}
			})
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
import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {withState, compose, withHandlers, pure} from 'recompose';

const addDataSource = withState('todo', 'handleTodo', []);

const addMessaging = compose(
    withState('message', 'handleInput', ''),
    withHandlers({
        onChange: ({handleInput}) => value => {
            handleInput(value)
        },
        onSubmit: ({addtodo, message, toEmpty, handleInput}) => event => {
            event.preventDefault();
            if (!message) {
                return;
            }
            addtodo(message);
            handleInput('');
        },
    }),
)

const enhance = compose(addDataSource, addMessaging, pure);

const Addtodo = enhance(({todo, message, onChange, onSubmit, toEmpty}) =>
    <div>
        <AutoComplete
            hintText="what to do"
            dataSource={ todo }
            searchText={ message }
            floatingLabelText="what to do"
            onUpdateInput={ onChange }
            style={ {width: 300} }
        >
        </AutoComplete>
        <RaisedButton label="submit" onClick={ onSubmit }/>
    </div>
)

export default Addtodo

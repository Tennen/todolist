import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {withState, withHandlers, branch, compose, renderComponent, pure} from 'recompose';

const isEditing = compose(
    withState('isEditing', 'toggleEditing', false),
    withHandlers({
        onDbClick: ({isEditing, toggleEditing}) => () => {
            toggleEditing(!isEditing);
        }
    })
)

const addEditing = compose(
    withState('message', 'changeMessage', ''),
    withHandlers({
        handleContentChange: ({changeMessage}) => (e, value) => {
            changeMessage(value);
        },
        handleEnter: ({cid, edittodo, message, toggleEditing}) => (e) => {
            if (e.key === 'Enter') {
                edittodo(cid, message)
                toggleEditing(false);
            }
        },
    })
)

const toggleDone = compose(
    withState('isSwitchOn', 'toggleSwitch', null),
    withHandlers({
        toggleCompleted: ({completed, content, cid, togglecompleted, isSwitchOn, toggleSwitch}) => (event) => {
            if (isSwitchOn) {
                clearTimeout(isSwitchOn);
                toggleSwitch(!isSwitchOn);
                return;
            }
            const timer = setTimeout(() => {
                togglecompleted(cid, completed);
                toggleSwitch(null);
            }, 300)
            toggleSwitch(timer);
        }
    })
)

const childTextField = addEditing(({content, handleContentChange, handleEnter}) =>
    <TextField
        hintText={ content }
        onChange={ handleContentChange }
        onKeyUp={ handleEnter }
    />
)


const childListItem = toggleDone(({completed, toggleCompleted, content, onDbClick}) =>
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
    ({isEditing}) => isEditing ? true : false,
    renderComponent(childTextField),
    renderComponent(childListItem),
)

const enhance = compose(isEditing, addBranch, pure);

const Todo = enhance(() =>
    <div>
    </div>
)

export default Todo

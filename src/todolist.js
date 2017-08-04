import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Todo from './todo';
import {map, filter, propEq, compose} from 'ramda';
import {withState, withHandlers, compose as compose_r} from 'recompose';

const TodoList = ({ list, togglecompleted, edittodo, completed }) => {
    const objToItem = (todo) => {
        return (<Todo
            cid={ todo.ID }
            key={ todo.ID }
            content={ todo.text }
            completed={ todo.completed }
            togglecompleted={togglecompleted}
            edittodo={edittodo}
        />)
    }
    const listitem = map(objToItem)(list)
    return (
        <List style={{flex: 1}}>
            <Subheader>{!completed ? "TodoList" : "DoneList"}</Subheader>
            {
                listitem
            }
        </List>
    )
}

export default TodoList
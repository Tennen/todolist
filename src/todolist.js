import React, {Component} from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Todo from './todo';
import {map} from 'ramda';

const TodoList = ({list, togglecompleted, edittodo, completed}) => {
  const objToItem = (todo) => {
    return (<Todo
      cid={ todo.ID }
      key={ todo.ID }
      content={ todo.text }
      completed={ todo.completed }
      togglecompleted={togglecompleted}
      edittodo={edittodo}
    />)
  };
  const listitem = map(objToItem)(list);
  return (
    <List style={{flex: 1}}>
      <Subheader>{!completed ? "TodoList" : "DoneList"}</Subheader>
      {
        listitem
      }
    </List>
  )
};

export default TodoList
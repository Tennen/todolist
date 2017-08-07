import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Todo from './todo';
import {map} from 'ramda';

const TodoList = ({list, togglecompleted, edittodo, completed, isFetching}) => {
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
        { isFetching ?
          <CircularProgress size={60} thickness={7} style={{marginLeft: 70}}/>
          : <Subheader>{!completed ? "TodoList" : "DoneList"}</Subheader> }
        {
          listitem
        }
      </List>
  )
};

export default TodoList
import React from 'react';
import {connect} from 'react-redux';
import TodoList from './todolist';
import Addtodo from './addtodo';
import Chip from 'material-ui/Chip';
import {post} from './Net/net';
import {withHandlers, compose, pure} from 'recompose';
import {propEq, filter} from 'ramda';

const App = compose(
  connect(state => {
    const todos = filter(propEq('completed', false))(state.todos.list);
    const dones = filter(propEq('completed', true))(state.todos.list);
    return ({
      showDoneList: state.showDoneList,
      todos,
      dones,
      isFetching: state.todos.isFetching,
    })
  }),
  withHandlers({
    showList: ({dispatch}) => () => {
      dispatch({
        type: 'TOGGLE_SHOW',
      })
    },
    addToDo: ({dispatch}) => (msg) => {
      dispatch((() => () =>
        post('/addtodo', {content: msg})
          .then(res => {
            if (!res.err) {
              dispatch({
                type: 'ADD_TODO',
                payload: {
                  message: msg,
                  completed: false,
                  id: res.id
                }
              })
            }
          }))()
      );
    },
    toggleCompleted: ({dispatch}) => (cid, completed) => {
      dispatch((() => () =>
        post('/toggle', {"ID": cid, "completed": !completed})
          .then(res => {
            if (!res.err) {
              dispatch({
                type: 'TOGGLE_TODO',
                payload: {
                  cid,
                }
              })
            }
          }))()
      );
    },
    editTodo: ({dispatch}) => (cid, content) => {
      dispatch((() => () =>
        post('/edit', {"ID": cid, "text": content})
          .then(res => {
            if (!res.err) {
              dispatch({
                type: 'EDIT_TODO',
                payload: {
                  cid,
                  content,
                }
              })
            }
          }))()
      );
    }
  }),
  pure,
)(({addToDo, showList, toggleCompleted, editTodo, todos, dones, isFetching, showDoneList}) => (
  <div style={{width: '480px'}}>
    <Addtodo addtodo={addToDo}/>
    <TodoList
      completed={false}
      list={todos}
      togglecompleted={toggleCompleted}
      edittodo={editTodo}
      isFetching={isFetching}
    />
    <Chip
      style={{marginLeft: 50}}
      onClick={showList}
      onTouchTap={showList}
    >
      show donelist
    </Chip>
    {showDoneList ? <TodoList
      completed={true}
      list={dones}
      togglecompleted={toggleCompleted}
      edittodo={editTodo}
    />
      : null
    }
  </div>
));

export default App

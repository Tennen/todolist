import React, {Component} from 'react';
import {connect} from 'react-redux';
import TodoList from './todolist';
import Addtodo from './addtodo';
import Chip from 'material-ui/Chip';
import {post} from './Net/net';
import {withHandlers, compose, pure} from 'recompose';
import {propEq, filter} from 'ramda';


const App = compose(
    connect(state => {
        const todos = filter(propEq('completed', false))(state.todos);
        const dones = filter(propEq('completed', true))(state.todos);
        return ({
            showDoneList: state.showDoneList,
            todos,
            dones,
        })
    }),
    withHandlers({
        showList: ({dispatch}) => () => {
            dispatch({
                type: 'TOGGLE_SHOW',
            })
        },
        addToDo: ({dispatch}) => (msg) => {
            post('/addtodo', {content: msg})
                .then(res => {
                    if (!res.err) {
                        dispatch({
                            type: 'ADD_TODO',
                            data: {
                                message: msg,
                                completed: false,
                                id: res.id
                            }
                        })
                    }
                })
        },
        toggleCompleted: ({dispatch}) => (cid, completed) => {
            post('/toggle', {"ID": cid, "completed": !completed})
                .then(res => {
                    if (!res.err) {
                        dispatch({
                            type: 'TOGGLE_TODO',
                            data: {
                                cid,
                            }
                        })
                    }
                })
        },
        editTodo: ({dispatch}) => (cid, content) => {
            post('/edit', {"ID": cid, "text": content})
                .then(res => {
                    if (!res.err) {
                        dispatch({
                            type: 'EDIT_TODO',
                            data: {
                                cid,
                                content,
                            }
                        })
                    }
                })
        }
    }),
    pure,
)(({addToDo, showList, toggleCompleted, editTodo, todos, dones, showDoneList}) => (
    <div style={{width: '480px'}}>
        <Addtodo addtodo={addToDo}/>
        <TodoList
            completed={false}
            list={todos}
            togglecompleted={toggleCompleted}
            edittodo={editTodo}
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

import {get} from './Net/net';

export const LOAD_TODOS = 'LOAD_TODOS';
export const loadTodos = () => ({
  type: LOAD_TODOS,
  payload: {
    promise: () => get('/todolist'),
    isAPI: true,
  },
});
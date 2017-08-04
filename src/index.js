import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import todoApp from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {get} from './Net/net';

const store = createStore(todoApp);

get('/todolist').then(res => {
    store.dispatch({
        type: 'LOAD_TODO',
        data: {
            todolist: res
        }
    })
});

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
registerServiceWorker();

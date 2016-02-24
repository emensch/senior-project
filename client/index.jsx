import React                from 'react';
import { render }           from 'react-dom';
import { createStore,
         applyMiddleware }  from 'redux';
import { Provider }         from 'react-redux';
import createLogger         from 'redux-logger';

import reducer             from './reducers';
import { submitEmail,
         changePage }       from './actions';

import App                  from './components/index';
import './styles.scss';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger));

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
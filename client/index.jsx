import React            from 'react';
import { render }       from 'react-dom';
import { createStore }  from 'redux';
import { Provider }     from 'react-redux';

import reducers         from './reducers';
import { submitEmail,
         changePage }   from './actions';

import App              from './components/index';
import './styles.scss';

const store = createStore(reducers);

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
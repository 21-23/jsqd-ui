import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers';

import serverPipe from '../middleware/server-pipe';

const store = createStore(reducer, applyMiddleware(serverPipe));

if (process.env.NODE_ENV !== 'production') {
    window.store = store;
}

export default store;

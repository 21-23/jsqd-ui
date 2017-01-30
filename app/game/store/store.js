import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers';

import serverPipe from '../middleware/server-pipe';

export default createStore(reducer, applyMiddleware(serverPipe));

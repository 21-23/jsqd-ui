import { createAction } from 'redux-actions';

import { SESSION_STATE } from '../actions/session';

export const setSessionState = createAction(SESSION_STATE);

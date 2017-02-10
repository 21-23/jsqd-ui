import { createAction } from 'redux-actions';

import { CONNECTION_STATUS } from '../actions/connection';

export const updateConnectionStatus = createAction(CONNECTION_STATUS);

import { createAction } from 'redux-actions';

import { UPDATE_CONNECTION_STATUS } from '../actions/connection';

export const updateConnectionStatus = createAction(UPDATE_CONNECTION_STATUS);

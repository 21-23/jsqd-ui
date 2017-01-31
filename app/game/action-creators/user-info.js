import { createAction } from 'redux-actions';

import { UPDATE_USER_INFO } from '../actions/user-info';

export const updateUserInfo = createAction(UPDATE_USER_INFO);

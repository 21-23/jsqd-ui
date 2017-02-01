import { createAction } from 'redux-actions';

import { VERIFY_USER_SOLUTION } from '../actions/puzzle-flow';

export const verifyUserSolution = createAction(VERIFY_USER_SOLUTION);

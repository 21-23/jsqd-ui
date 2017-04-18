import { createAction } from 'redux-actions';

import { SCORE } from '../actions/score';

export const updateScore = createAction(SCORE);

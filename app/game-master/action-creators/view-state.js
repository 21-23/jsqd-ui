import { createAction } from 'redux-actions';

import { SWITCH_VISIBLE_SCORE } from '../actions/view-state';

export const switchScoreView = createAction(SWITCH_VISIBLE_SCORE);

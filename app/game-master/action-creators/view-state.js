import { createAction } from 'redux-actions';

import { SWITCH_VISIBLE_SCORE, OPEN_PARTICIPANT_INPUT_POP_UP, CLOSE_PARTICIPANT_INPUT_POP_UP } from '../actions/view-state';

export const switchScoreView = createAction(SWITCH_VISIBLE_SCORE);
export const openParticipantInputPopUp = createAction(OPEN_PARTICIPANT_INPUT_POP_UP);
export const closeParticipantInputPopUp = createAction(CLOSE_PARTICIPANT_INPUT_POP_UP);

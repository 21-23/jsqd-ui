import { createAction } from 'redux-actions';

import * as RoundActions from '../actions/round';

export const updateCurrentRound = createAction(RoundActions.CURRENT_ROUND);
export const updateRoundPhase = createAction(RoundActions.ROUND_PHASE);
export const updateCountdown = createAction(RoundActions.COUNTDOWN);
export const updatePuzzle = createAction(RoundActions.PUZZLE);
export const updateRemaining = createAction(RoundActions.REMAINING);

export const selectRound = createAction(RoundActions.SELECTED_ROUND);
export const startRound = createAction(RoundActions.START_ROUND);
export const stopRound = createAction(RoundActions.STOP_ROUND);

export const updateParticipantSolution = createAction(RoundActions.PARTICIPANT_SOLUTION);

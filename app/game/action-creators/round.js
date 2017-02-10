import { createAction } from 'redux-actions';

import * as RoundActions from '../actions/round';

export const updateSolutionResult = createAction(RoundActions.SOLUTION_RESULT);
export const updateCurrentRound = createAction(RoundActions.CURRENT_ROUND);
export const updateRoundPhase = createAction(RoundActions.ROUND_PHASE);
export const updateCountdown = createAction(RoundActions.COUNTDOWN);
export const updatePuzzle = createAction(RoundActions.PUZZLE);
export const updateRemaining = createAction(RoundActions.REMAINING);

export const verifySolution = createAction(RoundActions.SOLUTION);

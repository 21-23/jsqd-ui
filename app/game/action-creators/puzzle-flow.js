import { createAction } from 'redux-actions';

import { VERIFY_USER_SOLUTION, USER_SOLUTION_RESULT, UPDATE_CURRENT_PUZZLE, UPDATE_CURRENT_ROUND_PHASE, UPDATE_COUNTDOWN, UPDATE_PUZZLE_DATA, UPDATE_ROUND_REMAINING } from '../actions/puzzle-flow';


export const verifyUserSolution = createAction(VERIFY_USER_SOLUTION);

export const updateUserSolutionResult = createAction(USER_SOLUTION_RESULT);

export const updateCurrentPuzzle = createAction(UPDATE_CURRENT_PUZZLE);

export const updateCurrentRoundPhase = createAction(UPDATE_CURRENT_ROUND_PHASE);

export const updateCountdown = createAction(UPDATE_COUNTDOWN);

export const updatePuzzleData = createAction(UPDATE_PUZZLE_DATA);

export const updateRoundRemaining = createAction(UPDATE_ROUND_REMAINING);

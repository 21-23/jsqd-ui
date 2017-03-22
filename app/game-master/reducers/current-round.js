import { error } from 'steno';

import * as RoundActions from '../actions/round';
import { SESSION_STATE } from '../actions/session';

import MockData from '../mock-data/current-round';

const RoundPhase = {
    IDLE: 'idle',
    COUNTDOWN: 'countdown',
    IN_PROGRESS: 'in-progress',
    END: 'end'
};

const defaultState = MockData;

function updateRound(state, round) {
    const { puzzle } = round;

    return Object.assign({}, state, {
        name: puzzle.name,
        duration: puzzle.duration,
        remaining: puzzle.duration,
        input: '',
        expected: '',
        phase: RoundPhase.IDLE,
        countdownRemaining: 0,

        solutionResult: '',
        solutionTime: 0,
        correct: false
    });
}

function updateRoundPhase(state, phase) {
    switch (phase) {
        case RoundPhase.IDLE:
        case RoundPhase.COUNTDOWN:
        case RoundPhase.IN_PROGRESS:
        case RoundPhase.END:
            return Object.assign({}, state, { phase });
        default:
            error('Unknown round phase');
            return state;
    }
}

function updateCountdown(state, countdownRemaining) {
    if (state.phase !== RoundPhase.COUNTDOWN) {
        return state;
    }

    return Object.assign({}, state, { countdownRemaining });
}

function updatePuzzle(state, puzzle) {
    return Object.assign({}, state, {
        input: puzzle.input,
        expected: puzzle.expected,
    });
}

function updateRemaining(state, remaining) {
    return Object.assign({}, state, { remaining });
}

export default function currentRound(state = defaultState, action) {
    switch(action.type) {
        case SESSION_STATE:
            return Object.assign({}, state, action.payload.round);
        case RoundActions.CURRENT_ROUND:
            return updateRound(state, action.payload);
        case RoundActions.ROUND_PHASE:
            return updateRoundPhase(state, action.payload);
        case RoundActions.COUNTDOWN:
            return updateCountdown(state, action.payload);
        case RoundActions.PUZZLE:
            return updatePuzzle(state, action.payload);
        case RoundActions.REMAINING:
            return updateRemaining(action.payload);
        default:
            return state;
    }
}

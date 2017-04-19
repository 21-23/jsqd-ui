import { error } from 'steno';

import * as RoundActions from '../actions/round';
import { SESSION_STATE } from '../actions/session';
import { RoundPhases } from 'common/constants/round';

const defaultState = {
    name: '',
    duration: 0,
    remaining: 0,
    input: '',
    expected: '',
    phase: RoundPhases.IDLE,
    countdownRemaining: 0,
};

function updateRound(state, round) {
    return Object.assign({}, state, {
        name: round.name,
        duration: round.duration,
        remaining: round.duration,
        input: '',
        expected: '',
        phase: RoundPhases.IDLE,
        countdownRemaining: 0,

        solutionResult: '',
        solutionTime: 0,
        correct: false
    });
}

function updateRoundPhase(state, phase) {
    switch (phase) {
        case RoundPhases.IDLE:
        case RoundPhases.COUNTDOWN:
        case RoundPhases.IN_PROGRESS:
        case RoundPhases.END:
            return Object.assign({}, state, { phase });
        default:
            error('Unknown round phase');
            return state;
    }
}

function updateCountdown(state, countdownRemaining) {
    if (state.phase !== RoundPhases.COUNTDOWN) {
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

function updateRoundState(state, roundState) {
    const round = Object.assign({}, defaultState);

    round.countdownRemaining = roundState.countdownRemaining;
    round.remaining = roundState.remaining;
    round.phase = roundState.phase;

    if (roundState.puzzle) {
        round.name = roundState.puzzle.name || defaultState.name;
        round.duration = roundState.puzzle.timeLimit || defaultState.duration;
        round.input = roundState.puzzle.input || defaultState.input;
        round.expected = roundState.puzzle.expected || defaultState.expected;
    }

    return Object.assign({}, state, round);
}

export default function currentRound(state = defaultState, action) {
    switch(action.type) {
        case SESSION_STATE:
            return updateRoundState(state, action.payload.round);
        case RoundActions.CURRENT_ROUND:
            return updateRound(state, action.payload);
        case RoundActions.ROUND_PHASE:
            return updateRoundPhase(state, action.payload);
        case RoundActions.COUNTDOWN:
            return updateCountdown(state, action.payload);
        case RoundActions.PUZZLE:
            return updatePuzzle(state, action.payload);
        case RoundActions.REMAINING:
            return updateRemaining(state, action.payload);
        default:
            return state;
    }
}

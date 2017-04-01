import { error } from 'steno';

import * as RoundActions from '../actions/round';
import { SESSION_STATE } from '../actions/session';

const RoundPhase = {
    IDLE: 'idle',
    COUNTDOWN: 'countdown',
    IN_PROGRESS: 'in-progress',
    END: 'end'
};

const defaultState = {
    name: '', // Current round',
    duration: 0, // 120,
    remaining: 0, // 95,
    input: '', // JSON.stringify([{ name: 'Johnie', surname: 'Walker', age: 14 }, { name: 'Johnie', surname: 'Walker', age: 20 },{ name: 'Adam', surname: 'Smith', age: 99 },{ name: 'Jack', surname: 'Daniels', age: 18 }]),
    expected: '', // JSON.stringify([14, 20, 99, 18]),
    phase: RoundPhase.IDLE,
    countdownRemaining: 0,

    solutionTime: 0,
    solutionResult: '',
    correct: false,
    playerInput: '',
};

function updateSolution(state, solution) {
    return Object.assign({}, state, {
        solutionResult: solution.error || solution.result,
        solutionTime: solution.time,
        correct: solution.correct,
    });
}

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

function updatePlayerInput(state, playerInput) {
    return Object.assign({}, state, { playerInput });
}

function updateRoundState(state, roundState) {
    return Object.assign({}, state, roundState);
}

export default function currentRound(state = defaultState, action) {
    switch(action.type) {
        case RoundActions.SOLUTION_RESULT:
            return updateSolution(state, action.payload);
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
        case RoundActions.SOLUTION:
            return updatePlayerInput(state, action.payload);
        case SESSION_STATE:
            return updateRoundState(state, action.payload.round);
        default:
            return state;
    }
}

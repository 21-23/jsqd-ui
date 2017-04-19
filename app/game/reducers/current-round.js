import { error } from 'steno';

import * as RoundActions from '../actions/round';
import { SESSION_STATE } from '../actions/session';
import { RoundPhases } from 'common/constants/round';

const defaultState = {
    name: '', // Current round',
    duration: 0, // 120,
    remaining: 0, // 95,
    input: '', // JSON.stringify([{ name: 'Johnie', surname: 'Walker', age: 14 }, { name: 'Johnie', surname: 'Walker', age: 20 },{ name: 'Adam', surname: 'Smith', age: 99 },{ name: 'Jack', surname: 'Daniels', age: 18 }]),
    expected: '', // JSON.stringify([14, 20, 99, 18]),
    phase: RoundPhases.IDLE,
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
        correct: false,
        playerInput: '',
    });
}

function cleanRoundState(state) {
    return Object.assign({}, state, {
        input: '',
        expected: '',

        solutionResult: '',
        solutionTime: 0,
        correct: false,
        playerInput: '',
    });
}

function updateRoundPhase(state, phase) {
    switch (phase) {
        case RoundPhases.IDLE:
        case RoundPhases.COUNTDOWN:
            // TODO: use cleanRoundState and updateRound as handlers of roundPhase change (to RoundPhases.IDLE)
            return Object.assign({}, state, cleanRoundState(state), { phase });
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

function updatePlayerInput(state, playerInput) {
    return Object.assign({}, state, { playerInput });
}

function updateRoundState(state, roundState) {
    const round = Object.assign({}, defaultState);

    round.countdownRemaining = roundState.countdownRemaining;
    round.remaining = roundState.remaining;
    round.phase = roundState.phase;
    round.playerInput = roundState.playerInput || defaultState.playerInput;

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

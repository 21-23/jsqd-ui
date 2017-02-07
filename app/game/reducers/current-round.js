import { connect } from 'preact-redux';

import { USER_SOLUTION_RESULT, UPDATE_CURRENT_PUZZLE, UPDATE_CURRENT_ROUND_PHASE, UPDATE_COUNTDOWN, UPDATE_PUZZLE_DATA, UPDATE_ROUND_REMAINING } from '../actions/puzzle-flow';

// TODO: const-ify round phases

const defaultState = {
    name: 'Current round',
    duration: 120,
    remaining: 95,
    taskSource: JSON.stringify([{ name: 'Johnie', surname: 'Walker', age: 14 }, { name: 'Johnie', surname: 'Walker', age: 20 },{ name: 'Adam', surname: 'Smith', age: 99 },{ name: 'Jack', surname: 'Daniels', age: 18 }]),
    taskTarget: JSON.stringify([14, 20, 99, 18]),
    currentSolutionResult: '',
    phase: 'idle', // idle | countdown | game | end
    countdownRemaining: 2,
    time: 0,
    correct: false
};

function updateUserSolution(state, solution) {
    return Object.assign({}, state, {
        currentSolutionResult: solution.error || solution.result,
        time: solution.time,
        correct: solution.correct,
    });
}

function updateCurrentPuzzle(state, puzzle) {
    return Object.assign({}, state, {
        name: puzzle.name,
        duration: puzzle.duration,
        remaining: puzzle.duration,
        taskSource: '',
        taskTarget: '',
        currentSolutionResult: '',
        phase: 'idle',
        countdownRemaining: 0,
        time: 0,
        correct: false
    });
}

function updateCurrentRoundPhase(state, phase) {
    switch (phase) {
        case 'idle':
        case 'countdown':
        case 'game':
        case 'end':
            return Object.assign({}, state, { phase });
        default:
            console.log('Unknown round phase');
            return state;
    }
}

function updateCountdown(state, countdown) {
    if (state.phase !== 'countdown') {
        return state;
    }

    return Object.assign({}, state, { countdownRemaining: countdown });
}

export default function currentRound(state = defaultState, action) {
    switch(action.type) {
        case USER_SOLUTION_RESULT:
            return updateUserSolution(state, action.payload);
        case UPDATE_CURRENT_PUZZLE:
            return updateCurrentPuzzle(state, action.payload);
        case UPDATE_CURRENT_ROUND_PHASE:
            return updateCurrentRoundPhase(state, action.payload);
        case UPDATE_COUNTDOWN:
            return updateCountdown(state, action.payload);
        case UPDATE_PUZZLE_DATA:
            return Object.assign({}, state, { taskSource: action.payload.input, taskTarget: action.payload.expected });
        case UPDATE_ROUND_REMAINING:
            return Object.assign({}, state, { remaining: action.payload });
        default:
            return state;
    }
}

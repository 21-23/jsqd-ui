import { CONNECTION_STATUS } from '../actions/connection';
import { CURRENT_ROUND } from '../actions/round';
import { SESSION_STATE } from '../actions/session';

const defaultState = {
    connected: false,
    currentRoundIndex: -1, // 3,
    puzzles: [], // [{ name: 'Puzzle 0' }, { name: 'Puzzle 1' }, { name: 'Puzzle 2' }, { name: 'Puzzle 3' }, { name: 'Puzzle 4' }]
};

function updateConnectionStatus(state, connected) {
    return Object.assign({}, state, { connected });
}

function updateCurrentRound(state, round) {
    return Object.assign({}, state, { currentRoundIndex: round.index });
}

function updatePuzzlesList(state, session) {
    return Object.assign({}, state, {
        currentRoundIndex: session.currentRoundIndex,
        puzzles: Array(session.puzzleCount).fill('Puzzle'), // TODO: do we need an array? are we going to show all puzzles' names? is count only enough?
    });
}

export default function session(state = defaultState, action) {
    switch(action.type) {
        case CONNECTION_STATUS:
            return updateConnectionStatus(state, action.payload);
        case CURRENT_ROUND:
            return updateCurrentRound(state, action.payload);
        case SESSION_STATE:
            return updatePuzzlesList(state, action.payload.session);
        default:
            return state;
    }
}

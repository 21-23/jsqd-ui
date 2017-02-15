import { CONNECTION_STATUS } from '../actions/connection';
import { SELECTED_ROUND } from '../actions/round';

const defaultState = {
    connected: false,
    currentRoundIndex: 3,
    selectedRoundIndex: 0,
    puzzles: [
        { name: 'Puzzle 0' },
        { name: 'Puzzle 1' },
        { name: 'Puzzle 2' },
        { name: 'Puzzle 3' },
        { name: 'Puzzle 4' },
    ]
};

function updateConnectionStatus(state, connected) {
    return Object.assign({}, state, { connected });
}

function updateSelectedRound(state, selectedRoundIndex) {
    return Object.assign({}, state, { selectedRoundIndex });
}

export default function session(state = defaultState, action) {
    switch(action.type) {
        case CONNECTION_STATUS:
            return updateConnectionStatus(state, action.payload);
        case SELECTED_ROUND:
            return updateSelectedRound(state, action.payload);
        default:
            return state;
    }
}

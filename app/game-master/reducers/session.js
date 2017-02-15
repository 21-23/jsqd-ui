import { CONNECTION_STATUS } from '../actions/connection';

const defaultState = {
    connected: false,
    currentRoundIndex: 3,
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

export default function session(state = defaultState, action) {
    switch(action.type) {
        case CONNECTION_STATUS:
            return updateConnectionStatus(state, action.payload);
        default:
            return state;
    }
}

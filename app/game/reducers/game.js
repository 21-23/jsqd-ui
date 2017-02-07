import { UPDATE_CONNECTION_STATUS } from '../actions/connection';
import { UPDATE_CURRENT_PUZZLE } from '../actions/puzzle-flow';

const defaultState = {
    connected: false,
    status: 'active',
    currentRoundIndex: 1,
    rounds: [
        { name: 'Round 0' },
        { name: 'Round 1' },
        { name: 'Round 2' },
    ]
};

export default function game(state = defaultState, action) {
    switch(action.type) {
        case UPDATE_CONNECTION_STATUS:
            return Object.assign({}, state, { connected: action.payload });
        case UPDATE_CURRENT_PUZZLE:
            return Object.assign({}, state, { currentRoundIndex: action.payload.index });
        default:
            return state;
    }
}

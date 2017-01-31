import { UPDATE_CONNECTION_STATUS } from '../actions/connection';

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
        default:
            return state;
    }
}

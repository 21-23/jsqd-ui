import { connect } from 'preact-redux';

const defaultState = {
    name: 'Current round',
    duration: 120,
    remaining: 95
};

export default function currentRound(state = defaultState, action) {
    switch(action.type) {
        default:
            return state;
    }
}

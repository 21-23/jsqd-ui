import { connect } from 'preact-redux';

const defaultState = {
    displayName: 'Player',
    iconCharCode: '&#xf007;',
};

export default function userPanel(state = defaultState, action) {
    switch(action.type) {
        default:
            return state;
    }
}

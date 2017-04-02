import { SESSION_STATE } from '../actions/session';

const defaultState = {
    displayName: '', // Player',
    role: 'player', // role can't be changed (at least now)
};

function updateParticipantInfo(state, participant) {
    return Object.assign({}, state, {
        displayName: participant.displayName,
    });
}

export default function participant(state = defaultState, action) {
    switch(action.type) {
        case SESSION_STATE:
            return updateParticipantInfo(state, action.payload.participant);
        default:
            return state;
    }
}

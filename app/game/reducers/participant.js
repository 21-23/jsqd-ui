import { PARTICIPANT_INFO } from '../actions/participant';

const defaultState = {
    displayName: 'Player',
    role: 'player'
};

function updateParticipantInfo(state, participant) {
    return Object.assign({}, state, {
        displayName: participant.displayName,
        role: participant.role,
    });
}

export default function participant(state = defaultState, action) {
    switch(action.type) {
        case PARTICIPANT_INFO:
            return updateParticipantInfo(state, action.payload);
        default:
            return state;
    }
}

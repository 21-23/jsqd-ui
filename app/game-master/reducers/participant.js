import { SESSION_STATE } from '../actions/session';
import { Roles } from 'common/constants/participant';

const defaultState = {
    displayName: '', // Game Master
    role: Roles.GAME_MASTER, // role can't be changed (at least now)
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

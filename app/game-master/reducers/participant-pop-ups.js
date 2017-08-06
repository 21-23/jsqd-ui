import { OPEN_PARTICIPANT_INPUT_POP_UP, CLOSE_PARTICIPANT_INPUT_POP_UP } from '../actions/view-state';

const defaultState = [];

function closePopUp(state, participantId) {
    return state.filter((popUp) => {
        return popUp.participantId !== participantId;
    });
}

function openPopUp(state, popUp) {
    return closePopUp(state, popUp.participantId).concat([popUp]);
}

export default function participantPopUp(state = defaultState, action) {
    switch(action.type) {
        case OPEN_PARTICIPANT_INPUT_POP_UP:
            return openPopUp(state, action.payload);
        case CLOSE_PARTICIPANT_INPUT_POP_UP:
            return closePopUp(state, action.payload);
        default:
            return state;
    }
}

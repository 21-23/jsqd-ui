import MockData from '../mock-data/score';
import {
    PARTICIPANT_JOINED,
    PARTICIPANT_LEFT,
} from '../actions/participant';
import { PARTICIPANT_SOLUTION } from '../actions/round';

const defaultState = MockData;
const defaultParticipant = {
    time: null,
    length: 0,
    correct: false,
};

function addNewParticipant(state, participant) {
    const newParticipant = Object.assign({}, defaultParticipant, participant);

    return Object.assign({}, state, {
        round: state.round.concat([newParticipant]),
    });
}

function removeParticipant(state, id) {
    const filterParticipants = participant => participant.participantId !== id;

    return Object.assign({}, state, {
        round: state.round.filter(filterParticipants),
    });
}

function updateParticipantRoundScore(state, participantData) {
    const { participantId } = participantData;

    return Object.assign({}, state, {
        round: state.round.map((participant) => {
            if (participant.participantId === participantId) {
                return Object.assign({}, participant, participantData);
            }

            return participant;
        })
    });
}
export default function participant(state = defaultState, action) {
    switch (action.type) {
        case PARTICIPANT_JOINED:
            return addNewParticipant(state, action.payload);
        case PARTICIPANT_LEFT:
            return removeParticipant(state, action.payload.participantId);
        case PARTICIPANT_SOLUTION:
            return updateParticipantRoundScore(state, action.payload);
        default:
            return state;
    }
}

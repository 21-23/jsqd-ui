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

export default function participant(state = defaultState, action) {
    switch (action.type) {
        case PARTICIPANT_JOINED: {
            const newParticipant = Object.assign(defaultParticipant, action.payload);

            return Object.assign({}, state, {
                round: state.round.concat([newParticipant]),
                aggregate: state.aggregate.concat([newParticipant]),
            });
        }
        case PARTICIPANT_LEFT: {
            const filterParticipants = participant => participant.participantId !== action.payload.participantId;

            return Object.assign({}, state, {
                round: state.round.filter(filterParticipants),
                aggregate: state.aggregate.filter(filterParticipants)
            });
        }
        case PARTICIPANT_SOLUTION: {
            return Object.assign({}, state, {
                round: state.round.map((participant) => {
                    if (participant.participantId === action.payload.participantId) {
                        return Object.assign({}, participant, action.payload);
                    }

                    return participant;
                })
            });
        }

        default:
            return state;
    }
}

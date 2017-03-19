import MockData from '../mock-data/score';
import {
    PARTICIPANT_JOINED,
    PARTICIPANT_LEFT,
    PARTICIPANT_SOLUTION
} from '../actions/score';

const defaultState = MockData;

export default function participant(state = defaultState, action) {
    switch (action.type) {
        case PARTICIPANT_JOINED:
            return Object.assign({}, state, {
                round: state.round.concat([action.payload]),
            });
        case PARTICIPANT_LEFT:
            return Object.assign({}, state, {
                round: state.round.filter((participant) => {
                    return participant.participantId !== action.payload.participantId;
                }),
            });
        case PARTICIPANT_SOLUTION:
            return Object.assign({}, state, {
                round: state.round.map((participant) => {
                    if (participant.participantId === action.payload.participantId) {
                        return Object.assign({}, participant, action.payload);
                    }

                    return participant;
                })
            });
        default:
            return state;
    }
}

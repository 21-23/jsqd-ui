import {
    PARTICIPANT_JOINED,
    PARTICIPANT_LEFT,
} from '../actions/participant';
import { PARTICIPANT_SOLUTION, ROUND_PHASE, SOLUTIONS_SYNC } from '../actions/round';
import { SESSION_STATE } from '../actions/session';
import { SCORE } from '../actions/score';

import { RoundPhases } from 'common/constants/round';
import { SolutionCorrect } from 'common/constants/solution';

const defaultState = {
    round: [],
    aggregate: [],
};
const defaultParticipant = {
    time: null,
    length: 0,
    correct: SolutionCorrect.INCORRECT,
};

function formatRoundScore(players) {
    return players.map(({ participantId, displayName, inputLength, solution }) => {
        let correct = SolutionCorrect.INCORRECT;
        let time = null;
        let code = '';

        if (solution) {
            correct = solution.correct;
            time = solution.time;
            code = solution.code;
        }

        return { participantId, displayName, length: inputLength, correct, time, code };
    });
}

function formatAggregateScore(players) {
    return players.map(({ participantId, displayName, aggregateScore }) => {
        return { participantId, displayName, time: aggregateScore };
    });
}

function updateScores(state, players) {
    return Object.assign({}, state, {
        round: formatRoundScore(players),
        aggregate: formatAggregateScore(players),
    });
}

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

function syncSolutions(state, solutions) {
    if (!solutions) {
        return state;
    }

    return Object.assign({}, state, {
        round: state.round.map((participant) => {
            const solution = solutions[participant.participantId];
            if (solution) {
                return Object.assign({}, participant, solution);
            }

            return participant;
        })
    });
}

function cleanRoundScores(state) {
    const cleanRoundScore = score => Object.assign({}, score, defaultParticipant);

    return Object.assign({}, state, {
        round: state.round.map(cleanRoundScore),
    });
}

function updateRoundPhase(state, phase) {
    switch (phase) {
        case RoundPhases.IDLE:
        case RoundPhases.COUNTDOWN:
            return cleanRoundScores(state);
        case RoundPhases.IN_PROGRESS:
        case RoundPhases.END:
        default:
            return state;
    }
}

export default function score(state = defaultState, action) {
    switch (action.type) {
        case SESSION_STATE:
            return updateScores(state, action.payload.score.players);
        case PARTICIPANT_JOINED:
            return addNewParticipant(state, action.payload);
        case PARTICIPANT_LEFT:
            return removeParticipant(state, action.payload.participantId);
        case PARTICIPANT_SOLUTION:
            return updateParticipantRoundScore(state, action.payload);
        case SOLUTIONS_SYNC:
            return syncSolutions(state, action.payload);
        case ROUND_PHASE:
            return updateRoundPhase(state, action.payload);
        case SCORE:
            return updateScores(state, action.payload);
        default:
            return state;
    }
}

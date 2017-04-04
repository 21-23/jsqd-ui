import createPhoenix from 'phoenix';
import messageFactory from 'message-factory'; // TODO: no need in the whole module
import { error, warn, log } from 'steno';

import config from '../config.json';
import { buildEndpointUri } from 'common/utils/connection';

import * as RoundActions from '../actions/round';

import { updateConnectionStatus } from '../action-creators/connection';
import { addNewParticipant, removeParticipant } from '../action-creators/participant';
import {
    updateParticipantSolution,
    updateRemaining,
    updateCurrentRound,
    updatePuzzle,
    updateRoundPhase,
    updateCountdown
} from '../action-creators/round';
import { setSessionState } from '../action-creators/session';

const { parseMessage, protocol: { frontService, ui } } = messageFactory;
const MESSAGE_NAME = ui.MESSAGE_NAME;

function formatStateMessage(message) {
    const { roundCountdown, startCountdown, roundPhase } = message;
    const { input, expected, name, timeLimit } = message.puzzle;
    const { roundScore, aggregateScore } = message.score;
    const { puzzleIndex, puzzleCount, displayName } = message;

    return {
        round: {
            name,
            input,
            expected,
            countdownRemaining: startCountdown,
            duration: timeLimit,
            remaining: roundCountdown,
            phase: roundPhase,
        },
        participant: {
            displayName,
        },
        score: {
            round: roundScore,
            aggregate: aggregateScore,
        },
        session: {
            currentRoundIndex: puzzleIndex,
            puzzleCount,
        }
    };
}

function getAction(message) {
    switch (message.name) {
        case MESSAGE_NAME.gameMasterSessionState:
            return setSessionState(formatStateMessage(message));
        case MESSAGE_NAME.participantJoined:
            return addNewParticipant({
                participantId: message.participantId,
                displayName: message.displayName,
            });
        case MESSAGE_NAME.participantLeft:
            return removeParticipant({
                participantId: message.participantId,
            });
        case MESSAGE_NAME.participantSolution:
            return updateParticipantSolution({
                participantId: message.participantId,
                time: message.time,
                length: message.length,
                correct: message.correct,
            });
        case MESSAGE_NAME.roundCountdownChanged:
            return updateRemaining(message.roundCountdown);
        case MESSAGE_NAME.puzzleChanged:
            return updateCurrentRound({
                index: message.puzzleIndex,
                duration: message.timeLimit,
                name: message.puzzleName,
            });
        case MESSAGE_NAME.puzzle:
            return updatePuzzle({
                input: message.input,
                expected: message.expected,
            });
        case MESSAGE_NAME.roundPhaseChanged:
            return updateRoundPhase(message.roundPhase);
        case MESSAGE_NAME.startCountdownChanged:
            return updateCountdown(message.startCountdown);
        default:
            return null;
    }
}

function handleServerMessage(message, dispatch) {
    const action = getAction(message);

    if (action) {
        dispatch(action);
    } else {
        warn('Unknown message from server');
    }
}


function handleClientAction(action, phoenix, dispatch, getState) {
    switch (action.type) {
        case RoundActions.SELECTED_ROUND:
            return phoenix.send(frontService.puzzleIndexSet(action.payload));
        case RoundActions.START_ROUND:
            return phoenix.send(frontService.roundStart());
        case RoundActions.STOP_ROUND:
            return phoenix.send(frontService.roundStop());
        default:
            return log('Skip action reaction:', action.type);
    }
}

export default function serverPipeMiddleware({ getState, dispatch }) {
    // we can create a pipe immediately
    // phoenix will connect it ASAP
    const phoenix = createPhoenix(WebSocket, {
        uri: buildEndpointUri(config['server-endpoint']['uri']),
        timeout: config['server-endpoint']['timeout']
    });

    //just for messages emulation
    if (process.env.NODE_ENV !== 'production') {
        window.dispatch = dispatch;
        window.handleServerMessage = handleServerMessage;
        window.MESSAGE_NAME = MESSAGE_NAME;
    }


    phoenix
        .on('connected', () => {
            log('server connected');
            dispatch(updateConnectionStatus(true));
        })
        .on('disconnected', () => {
            log('server disconnected');
            dispatch(updateConnectionStatus(false));
        })
        .on('message', (incomingMessage) => {
            log('server message', incomingMessage);
            const { message } = parseMessage(incomingMessage.data);

            handleServerMessage(message, dispatch);
        });

    return (next) => {
        return (action) => {
            handleClientAction(action, phoenix, dispatch, getState);

            return next(action);
        };
    };
};

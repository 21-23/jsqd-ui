import createPhoenix from 'phoenix';
import messageFactory from 'message-factory'; // TODO: no need in the whole module
import config from '../config.json';

import * as RoundActions from '../actions/round';

import { updateConnectionStatus } from '../action-creators/connection';
import RoundActionsCreator from '../action-creators/round';

const { parseMessage, protocol: { frontService, ui } } = messageFactory;
const MESSAGE_NAME = ui.MESSAGE_NAME;

function handleServerMessage(message, dispatch) {
    switch (message.name) {
        case MESSAGE_NAME.solutionEvaluated:
            return RoundActionsCreator.updateSolutionResult({
                error: message.error,
                result: message.result,
                correct: message.correct,
                time: message.time,
            });
        case MESSAGE_NAME.puzzleChanged:
            return RoundActionsCreator.updateCurrentRound({
                index: message.puzzleIndex,
                duration: message.timeLimit,
                name: message.puzzleName,
            });
        case MESSAGE_NAME.roundPhaseChanged:
            return RoundActionsCreator.updateRoundPhase(message.roundPhase);
        case MESSAGE_NAME.startCountdownChanged:
            return RoundActionsCreator.updateCountdown(message.startCountdown);
        case MESSAGE_NAME.puzzle:
            return RoundActionsCreator.updatePuzzle({
                input: message.input,
                expected: message.expected,
            });
        case MESSAGE_NAME.roundCountdownChanged:
            return RoundActionsCreator.updateRemaining(message.roundCountdown);
        default:
            return console.warn('Unknown message from server');
    }
}

function handleClientAction(action, phoenix, dispatch, getState) {
    switch (action.type) {
        case RoundActions.SOLUTION:
            return phoenix.send(frontService.solution(action.payload));
        default:
            return console.log('Skip action reaction:', action.type);
    }
}

export default function serverPipeMiddleware({ getState, dispatch }) {
    // we can create a pipe immediately
    // phoenix will connect it ASAP
    const phoenix = createPhoenix(WebSocket, {
        uri: config['server-endpoint']['uri'],
        timeout: config['server-endpoint']['timeout'],
    });

    phoenix
        .on('connected', () => {
            console.log('server connected');
            dispatch(updateConnectionStatus(true));
        })
        .on('disconnected', () => {
            console.log('server disconnected');
            dispatch(updateConnectionStatus(false));
        })
        .on('message', (incomingMessage) => {
            console.log('server message', incomingMessage);
            const { message } = parseMessage(incomingMessage.data);

            handleServerMessage(message, dispatch);
        });

    return (next) => {
        return (action) => {
            handleClientAction(action, phoenix, dispatch, getState);

            return  next(action);
        };
    };
};

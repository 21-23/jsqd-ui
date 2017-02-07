import createPhoenix from 'phoenix';
import { createMessage, parseMessage } from 'message-factory';
import config from '../config.json';

import { VERIFY_USER_SOLUTION } from '../actions/puzzle-flow';

import { updateUserInfo } from '../action-creators/user-info';
import { updateConnectionStatus } from '../action-creators/connection';
import { updateUserSolutionResult, updateCurrentPuzzle, updateCurrentRoundPhase, updateCountdown, updatePuzzleData, updateRoundRemaining } from '../action-creators/puzzle-flow';

function handleServerMessage(message, dispatch) {
    switch (message.name) {
        case 'solution.evaluated':
            return updateUserSolutionResult({
                error: message.error,
                result: message.result,
                correct: message.correct,
                time: message.time,
            });
        case 'puzzle.changed':
            return updateCurrentPuzzle({
                duration: message.timeLimit,
                index: message.puzzleIndex,
                name: message.puzzleName,
            });
        case 'roundPhase.changed':
            return updateCurrentRoundPhase(message.roundPhase);
        case 'startCountdown.changed':
            return updateCountdown(message.startCountdown);
        case 'puzzle':
            return updatePuzzleData({
                input: message.input,
                expected: message.expected,
            });
        case 'roundCountdown.changed':
            return updateRoundRemaining(message.roundCountdown);
        case 'update-user-info':
            return dispatch(updateUserInfo(message.payload));
        default:
            return console.warn('Unknown message from server');
    }
}

function handleClientAction(action, phoenix, dispatch, getState) {
    switch (action.type) {
        case VERIFY_USER_SOLUTION:
            const message = createMessage('front-end-service', { type: 'solution', input: action.payload });
            return phoenix.send(message);
        default:
            return console.log('Skip action reaction:', action.type);
    }
}

export default function serverPipeMiddleware({ getState, dispatch }) {
    // we can create a pipe immediately
    // phoenix will connect it ASAP
    const phoenix = createPhoenix(WebSocket, {
        uri: config['server-endpoint']['uri'],
        timeout: config['server-endpoint']['timeout']
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

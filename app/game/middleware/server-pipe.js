import createPhoenix from 'phoenix';
import { createMessage, parseMessage } from 'message-factory';
import config from '../config.json';

import * as RoundActions from '../actions/round';

import { updateConnectionStatus } from '../action-creators/connection';
import RoundActionsCreator from '../action-creators/round';

function handleServerMessage(message, dispatch) {
    switch (message.name) {
        case 'solution.evaluated':
            return RoundActionsCreator.updateSolutionResult({
                error: message.error,
                result: message.result,
                correct: message.correct,
                time: message.time,
            });
        case 'puzzle.changed':
            return RoundActionsCreator.updateCurrentRound({
                index: message.puzzleIndex,
                duration: message.timeLimit,
                name: message.puzzleName,
            });
        case 'roundPhase.changed':
            return RoundActionsCreator.updateRoundPhase(message.roundPhase);
        case 'startCountdown.changed':
            return RoundActionsCreator.updateCountdown(message.startCountdown);
        case 'puzzle':
            return RoundActionsCreator.updatePuzzle({
                input: message.input,
                expected: message.expected,
            });
        case 'roundCountdown.changed':
            return RoundActionsCreator.updateRemaining(message.roundCountdown);
        default:
            return console.warn('Unknown message from server');
    }
}

function handleClientAction(action, phoenix, dispatch, getState) {
    switch (action.type) {
        case RoundActions.SOLUTION:
            const message = createMessage('front-service', { name: 'solution', input: action.payload });
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

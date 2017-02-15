import createPhoenix from 'phoenix';
import { createMessage, parseMessage } from 'message-factory';
import config from '../config.json';

import * as RoundActions from '../actions/round';

import { updateConnectionStatus } from '../action-creators/connection';

function handleServerMessage(message, dispatch) {
    switch (message.name) {
        default:
            return console.warn('Unknown message from server');
    }
}

function handleClientAction(action, phoenix, dispatch, getState) {
    switch (action.type) {
        case RoundActions.SELECTED_ROUND:
            const message = createMessage('front-service', { name: 'select-puzzle', index: action.payload });
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

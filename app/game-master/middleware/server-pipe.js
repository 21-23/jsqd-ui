import createPhoenix from 'phoenix';
import messageFactory from 'message-factory'; // TODO: no need in the whole module
import { error, warn, log } from 'steno';

import config from '../config.json';
import { buildEndpointUri } from 'common/utils/connection';

import * as RoundActions from '../actions/round';

import { updateConnectionStatus } from '../action-creators/connection';

const { parseMessage, protocol: { frontService, ui } } = messageFactory;
const MESSAGE_NAME = ui.MESSAGE_NAME;

function handleServerMessage(message, dispatch) {
    switch (message.name) {
        case MESSAGE_NAME.participantJoined:
            return;
        default:
            return warn('Unknown message from server');
    }
}

function handleClientAction(action, phoenix, dispatch, getState) {
    switch (action.type) {
        case RoundActions.SELECTED_ROUND:
            return phoenix.send(frontService.puzzleIndexSet(action.payload));
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

            return  next(action);
        };
    };
};

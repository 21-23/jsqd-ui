import createPhoenix from 'phoenix';
import { createMessage, parseMessage } from 'message-factory';
import config from '../config.json';

import { updateUserInfo } from '../action-creators/user-info';

function handleServerMessage(message, dispatch) {
    switch (message.type) {
        case 'update-user-info':
            return dispatch(updateUserInfo(message.payload));
        default:
            return console.warn('Unknown message from server');
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
        })
        .on('disconnected', () => {
            console.log('server disconnected');
        })
        .on('message', (message) => {
            console.log('server message', message);
            const parsedMessage = parseMessage(message.data, true);

            handleServerMessage(parsedMessage, dispatch);
        });

    return (next) => {
        return (action) => {
            // TODO: react on actions-commands (like send input to zandbak)
            return  next(action);
        };
    };
};

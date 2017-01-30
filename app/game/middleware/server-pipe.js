import createPhoenix from 'phoenix';
import { createMessage, parseMessage } from 'message-factory';
import config from '../config.json';

import { updateUserInfo } from '../action-creators/user-info';

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
            dispatch(updateUserInfo({ displayName: 'con' }));
        })
        .on('disconnected', () => {
            console.log('server disconnected');
            dispatch(updateUserInfo({ displayName: 'dis' }));
        })
        .on('message', (message) => {
            console.log('server message', message);
            const parsedMessage = parseMessage(message.data, true);
        });

    return (next) => {
        return (action) => {
            // TODO: react on actions-commands (like send input to zandbak)
            return  next(action);
        };
    };
};

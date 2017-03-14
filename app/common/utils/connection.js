export function buildEndpointUri(placeholder) {
    return placeholder
        .replace('${hostname}', global.location.hostname)
        .replace('${protocol}', (global.location.protocol === 'http:' ? 'ws:' : 'wss:'));
};

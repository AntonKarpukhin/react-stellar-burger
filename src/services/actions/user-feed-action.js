export const WS_USER_FEED_CONNECT = 'WS_USER_FEED_CONNECT';
export const WS_USER_FEED_DISCONNECT = 'WS_USER_FEED_DISCONNECT';
export const WS_USER_FEED_CONNECTING = 'WS_USER_FEED_CONNECTING';
export const WS_USER_FEED_OPEN = 'WS_USER_FEED_OPEN';
export const WS_USER_FEED_CLOSE = 'WS_USER_FEED_CLOSE';
export const WS_USER_FEED_MESSAGE = 'WS_USER_FEED_MESSAGE';
export const WS_USER_FEED_ERROR = 'WS_USER_FEED_ERROR';


export const connect = (url) => ({
    type: WS_USER_FEED_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: WS_USER_FEED_DISCONNECT,
});
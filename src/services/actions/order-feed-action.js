export const WS_ORDER_FEED_CONNECT = 'WS_ORDER_FEED_CONNECT';
export const WS_ORDER_FEED_DISCONNECT = 'WS_ORDER_FEED_DISCONNECT';
export const WS_ORDER_FEED_CONNECTING = 'WS_ORDER_FEED_CONNECTING';
export const WS_ORDER_FEED_OPEN = 'WS_ORDER_FEED_OPEN';
export const WS_ORDER_FEED_CLOSE = 'WS_ORDER_FEED_CLOSE';
export const WS_ORDER_FEED_MESSAGE = 'WS_ORDER_FEED_MESSAGE';
export const WS_ORDER_FEED_ERROR = 'WS_ORDER_FEED_ERROR';

export const connect = (url) => ({
    type: WS_ORDER_FEED_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: WS_ORDER_FEED_DISCONNECT,
});
import {
	WS_ORDER_FEED_CLOSE,
	WS_ORDER_FEED_CONNECT, WS_ORDER_FEED_CONNECTING,
	WS_ORDER_FEED_DISCONNECT, WS_ORDER_FEED_ERROR, WS_ORDER_FEED_MESSAGE, WS_ORDER_FEED_OPEN, WS_USER_FEED_CLOSE,
	WS_USER_FEED_CONNECT, WS_USER_FEED_CONNECTING,
	WS_USER_FEED_DISCONNECT, WS_USER_FEED_ERROR, WS_USER_FEED_MESSAGE, WS_USER_FEED_OPEN
} from "../types/constant";

export type TWsActions = {
	wsConnect: typeof WS_USER_FEED_CONNECT | typeof WS_ORDER_FEED_CONNECT,
	wsDisconnect: typeof WS_USER_FEED_DISCONNECT | typeof WS_ORDER_FEED_DISCONNECT,
	wsConnecting: typeof WS_USER_FEED_CONNECTING | typeof WS_ORDER_FEED_CONNECTING,
	onOpen: typeof WS_USER_FEED_OPEN | typeof WS_ORDER_FEED_OPEN,
	onClose: typeof WS_USER_FEED_CLOSE | typeof WS_ORDER_FEED_CLOSE,
	onError: typeof WS_USER_FEED_ERROR | typeof WS_ORDER_FEED_ERROR,
	onMessage: typeof WS_USER_FEED_MESSAGE | typeof WS_ORDER_FEED_MESSAGE
}
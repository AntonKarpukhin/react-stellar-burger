import {
    WS_ORDER_FEED_CLOSE,
    WS_ORDER_FEED_CONNECT,
    WS_ORDER_FEED_CONNECTING,
    WS_ORDER_FEED_DISCONNECT, WS_ORDER_FEED_ERROR, WS_ORDER_FEED_MESSAGE,
    WS_ORDER_FEED_OPEN
} from "../types/constant";

export interface IConnect {
    readonly type: typeof WS_ORDER_FEED_CONNECT;
    readonly payload: string;
}

export interface IDisconnect {
    readonly type: typeof WS_ORDER_FEED_DISCONNECT;
}

export interface IConnecting {
    readonly type: typeof WS_ORDER_FEED_CONNECTING;
}

export interface IOpen {
    readonly type: typeof WS_ORDER_FEED_OPEN;
}

export interface IError {
    readonly type: typeof WS_ORDER_FEED_ERROR;
    readonly payload: string;
}

export interface IMessage {
    readonly type: typeof WS_ORDER_FEED_MESSAGE;
    readonly payload: [];
}

export interface IClose {
    readonly type: typeof WS_ORDER_FEED_CLOSE;
}

export type TOrderFeedAction = IConnect | IDisconnect | IConnecting | IOpen | IError | IMessage | IClose;

export const connect = (url: string): IConnect => ({
    type: WS_ORDER_FEED_CONNECT,
    payload: url
});

export const disconnect = (): IDisconnect => ({
    type: WS_ORDER_FEED_DISCONNECT,
});

export const connecting = (): IConnecting => ({
    type: WS_ORDER_FEED_CONNECTING,
});

export const open = (): IOpen => ({
    type: WS_ORDER_FEED_OPEN,
});

export const error = (error: string): IError => ({
    type: WS_ORDER_FEED_ERROR,
    payload: error
});

export const message = (arr: []): IMessage => ({
    type: WS_ORDER_FEED_MESSAGE,
    payload: arr
});

export const close = (): IClose => ({
    type: WS_ORDER_FEED_CLOSE,
});
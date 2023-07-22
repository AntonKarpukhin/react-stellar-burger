import {
    WS_USER_FEED_CLOSE,
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_CONNECTING,
    WS_USER_FEED_DISCONNECT,
    WS_USER_FEED_ERROR,
    WS_USER_FEED_MESSAGE,
    WS_USER_FEED_OPEN
} from "../types/constant";

export interface IConnectUser {
    readonly type: typeof WS_USER_FEED_CONNECT;
    readonly payload: string;
}

export interface IDisconnectUser {
    readonly type: typeof WS_USER_FEED_DISCONNECT;
}

export interface IConnectingUser {
    readonly type: typeof WS_USER_FEED_CONNECTING;
}

export interface IOpenUser {
    readonly type: typeof WS_USER_FEED_OPEN;
}

export interface IErrorUser {
    readonly type: typeof WS_USER_FEED_ERROR;
    readonly payload: string;
}

export interface IMessageUser {
    readonly type: typeof WS_USER_FEED_MESSAGE;
    readonly payload: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    };
}

export interface ICloseUser {
    readonly type: typeof WS_USER_FEED_CLOSE;
}


export type TUserFeedAction = IConnectUser | IDisconnectUser | IConnectingUser | IOpenUser | IErrorUser | IMessageUser | ICloseUser;

export const connect = (url: string): IConnectUser => ({
    type: WS_USER_FEED_CONNECT,
    payload: url
});

export const disconnect = (): IDisconnectUser => ({
    type: WS_USER_FEED_DISCONNECT,
});

export const connecting = (): IConnectingUser => ({
    type: WS_USER_FEED_CONNECTING,
});

export const open = (): IOpenUser => ({
    type: WS_USER_FEED_OPEN,
});

export const error = (error: string): IErrorUser => ({
    type: WS_USER_FEED_ERROR,
    payload: error
});

export const message = (arr: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
}): IMessageUser => ({
    type: WS_USER_FEED_MESSAGE,
    payload: arr
});

export const close = (): ICloseUser => ({
    type: WS_USER_FEED_CLOSE,
});
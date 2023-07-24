import {
    WS_USER_FEED_CONNECTING,
    WS_USER_FEED_DISCONNECT, WS_USER_FEED_ERROR,
    WS_USER_FEED_MESSAGE,
    WS_USER_FEED_OPEN
} from "../types/constant";
import { WebsocketStatus } from "../../utils/data";
import { TUserFeedAction } from "../actions/user-feed-action";

interface IUserFeedState {
    status: string,
    orders: []
    connectingError: string
}

const initialState: IUserFeedState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectingError: ''
};

const userFeedReducer = (state: IUserFeedState = initialState, action: TUserFeedAction) => {
    switch (action.type)
    {
        case WS_USER_FEED_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        case WS_USER_FEED_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            };
        case WS_USER_FEED_DISCONNECT:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE,
            };
        case WS_USER_FEED_ERROR:
            return {
                ...state,
                connectingError: action.payload
            };
        case WS_USER_FEED_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders
            }
        default:
            return state;
    }
}

export default userFeedReducer;
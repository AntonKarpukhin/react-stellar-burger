import {WS_ORDER_FEED_CONNECTING , WS_ORDER_FEED_OPEN, WS_ORDER_FEED_DISCONNECT, WS_ORDER_FEED_ERROR, WS_ORDER_FEED_MESSAGE} from '../actions/order-feed-action'
import { WebsocketStatus } from "../../utils/data";

const initialState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectingError: ''
};

const orderFeedReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case WS_ORDER_FEED_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        case WS_ORDER_FEED_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            };
        case WS_ORDER_FEED_DISCONNECT:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE,
            };
        case WS_ORDER_FEED_ERROR:
            return {
                ...state,
                connectingError: action.payload
            };
        case WS_ORDER_FEED_MESSAGE:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state;
    }
}

export default orderFeedReducer;

import { WebsocketStatus } from "../../utils/data";
import { WS_ORDER_FEED_DISCONNECT, WS_ORDER_FEED_OPEN, WS_ORDER_FEED_CONNECTING, WS_ORDER_FEED_MESSAGE, WS_ORDER_FEED_ERROR} from "../types/constant";
import { TOrderFeedAction } from "../actions/order-feed-action";
import {  IOrders } from "../types/order";

interface IOrderFeedReducerState {
    status: string,
    orders: IOrders[],
    connectingError: string
}

const initialState: IOrderFeedReducerState = {
    status: WebsocketStatus.OFFLINE,
    orders: [{
        success: true,
        orders: [],
        total: '',
        totalToday: '',
    }],
    connectingError: ''
};

const orderFeedReducer = (state: IOrderFeedReducerState = initialState, action: TOrderFeedAction): IOrderFeedReducerState => {
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
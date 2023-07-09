import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import ingredients from "../reducers/ingredients";
import constructorBurger from "../reducers/constructorBurger";
import order from "../reducers/order";
import ingredient from "../reducers/ingredient";
import userReducer from '../reducers/user'
import orderFeedReducer  from "../reducers/order-feed-reducer";
import  orderFeedMiddleware from '../middleware/order-feed-middleware';
import userFeedReducer from "../reducers/user-feed-reducer";
import userFeedMiddleware from '../middleware/user-feed-middleware';

import {
    WS_ORDER_FEED_CONNECT,
    WS_ORDER_FEED_DISCONNECT,
    WS_ORDER_FEED_CONNECTING,
    WS_ORDER_FEED_OPEN,
    WS_ORDER_FEED_ERROR,
    WS_ORDER_FEED_MESSAGE,
    WS_ORDER_FEED_CLOSE
} from '../actions/order-feed-action'
import { wsUrlFeed } from "../../utils/data";
import {
    WS_USER_FEED_CLOSE,
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_CONNECTING,
    WS_USER_FEED_DISCONNECT, WS_USER_FEED_ERROR,
    WS_USER_FEED_MESSAGE,
    WS_USER_FEED_OPEN
} from "../actions/user-feed-action";


const orderFeedStatus = {
    wsConnect: WS_ORDER_FEED_CONNECT,
    wsDisconnect: WS_ORDER_FEED_DISCONNECT,
    wsConnecting: WS_ORDER_FEED_CONNECTING,
    onOpen: WS_ORDER_FEED_OPEN,
    onClose: WS_ORDER_FEED_CLOSE,
    onError: WS_ORDER_FEED_ERROR,
    onMessage: WS_ORDER_FEED_MESSAGE
}

const userFeedStatus = {
    wsConnect: WS_USER_FEED_CONNECT,
    wsDisconnect: WS_USER_FEED_DISCONNECT,
    wsConnecting: WS_USER_FEED_CONNECTING,
    onOpen: WS_USER_FEED_OPEN,
    onClose: WS_USER_FEED_CLOSE,
    onError: WS_USER_FEED_ERROR,
    onMessage: WS_USER_FEED_MESSAGE
}

const rootReducer = createStore(
    combineReducers({ ingredients, constructorBurger, ingredient, order, userReducer, orderFeedReducer, userFeedReducer }),
    compose(applyMiddleware(ReduxThunk),
        applyMiddleware(orderFeedMiddleware(wsUrlFeed, orderFeedStatus)),
        applyMiddleware(userFeedMiddleware(userFeedStatus)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default rootReducer;
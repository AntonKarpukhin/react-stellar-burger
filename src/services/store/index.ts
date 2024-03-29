import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import ingredients from "../reducers/ingredients";
import constructorBurger from "../reducers/constructorBurger";
import order from "../reducers/order";
import ingredient from "../reducers/ingredient";
import userReducer from '../reducers/user'
import orderFeedReducer  from "../reducers/order-feed-reducer";
import userFeedReducer from "../reducers/user-feed-reducer";
import socketFeedMiddleware from '../middleware/socket-feed-middleware';

import {
    WS_ORDER_FEED_CONNECT,
    WS_ORDER_FEED_DISCONNECT,
    WS_ORDER_FEED_CONNECTING,
    WS_ORDER_FEED_OPEN,
    WS_ORDER_FEED_ERROR,
    WS_ORDER_FEED_MESSAGE,
    WS_ORDER_FEED_CLOSE
} from '../types/constant'
import {
    WS_USER_FEED_CLOSE,
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_CONNECTING,
    WS_USER_FEED_DISCONNECT, WS_USER_FEED_ERROR,
    WS_USER_FEED_MESSAGE,
    WS_USER_FEED_OPEN
} from "../types/constant";


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
        applyMiddleware(socketFeedMiddleware(userFeedStatus)),
        applyMiddleware(socketFeedMiddleware(orderFeedStatus)),
        ));



export default rootReducer;


// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
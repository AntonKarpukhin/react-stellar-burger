import {
    ADD_INGREDIENT_ID,
    POST_ORDER,
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS, REMOVE_ORDER_ID
} from "../types/constant";
import { TOrderAction } from "../actions/orderAction";

interface IOrderState {
    orderID: number,
    ingredientsID: [],
    feedRequest: boolean,
    feedFailed: boolean,
}

const initialState: IOrderState = {
    orderID: 0,
    ingredientsID: [],
    feedRequest: false,
    feedFailed: false,
}

const order = (state: IOrderState = initialState, action: TOrderAction) => {
    switch ( action.type ) {
        case POST_ORDER:
            return {
                ...state,
                feedRequest: true,
                feedFailed: false,
            }
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                orderID: action.payload,
                feedRequest: false,
                feedFailed: false,
            }
        case POST_ORDER_FAILED:
            return {
                ...state,
                orderID: 0,
                ingredientsID: [],
                feedRequest: false,
                feedFailed: true,
            }
        case ADD_INGREDIENT_ID:
            return {
                ...state,
                ingredientsID: [...state.ingredientsID, action.payload]
            }
        case REMOVE_ORDER_ID:
            return {
                ...state,
                orderID: 0
            }
        default: {
            return state
        }
    }
}

export default order;
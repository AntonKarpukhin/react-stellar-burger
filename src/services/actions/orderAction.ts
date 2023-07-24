import { checkResponse, postOrder } from "../../utils/burger-api";
import {
    ADD_INGREDIENT_ID,
    POST_ORDER,
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS,
    REMOVE_ORDER_ID
} from "../types/constant";
import { IIngredientInterface } from "../types/ingredient-types";
import { AppDispatch, AppThunk } from "../store/store-types";



export interface IPostOrdered {
    readonly type: typeof POST_ORDER;
}

export interface IPostOrderSuccess {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly payload: IIngredientInterface;
}

export interface IPostOrderFailed {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface IAddIngredientId {
    readonly type: typeof ADD_INGREDIENT_ID;
    readonly payload: IIngredientInterface['_id'];
}

export interface IRemoveOrderId {
    readonly type: typeof REMOVE_ORDER_ID;
}

export type TOrderAction = IPostOrdered | IPostOrderSuccess | IPostOrderFailed | IAddIngredientId | IRemoveOrderId;

export const postFeed: AppThunk = (data) => (dispatch: AppDispatch) => {
    dispatch(postOrdered());
    const accessToken = localStorage.getItem('accessToken');
    postOrder(data, accessToken!)
        .then(checkResponse)
        .then(res => dispatch(postOrderSuccess(res.order.number)))
        .catch(err => dispatch(postOrderFailed()))
}

export const postOrdered = (): IPostOrdered => {
    return {
        type: POST_ORDER
    }
}

export const postOrderSuccess = (ingredient: IIngredientInterface): IPostOrderSuccess => {
    return {
        type: POST_ORDER_SUCCESS,
        payload: ingredient
    }
}

export const postOrderFailed = (): IPostOrderFailed => {
    return {
        type: POST_ORDER_FAILED
    }
}

export const addIngredientId = (ingredient: IIngredientInterface): IAddIngredientId => {
    return {
        type: ADD_INGREDIENT_ID,
        payload: ingredient._id
    }
}

export const removeOrderId = (): IRemoveOrderId => {
    return {
        type: REMOVE_ORDER_ID,
    }
}
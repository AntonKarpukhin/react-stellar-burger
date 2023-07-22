import { checkResponse, getOrder } from "../../utils/burger-api";
import { CLOSE_INGREDIENT, OPEN_INGREDIENT } from "../types/constant";
import { AppDispatch, AppThunk } from "../store/store-types";
import { IOneOrder, IOrderRequest } from "../types/order";


export interface IOpenIngredient {
    readonly type: typeof OPEN_INGREDIENT;
    readonly payload: IOneOrder[];
}

export interface IRemoveIngredient {
    readonly type: typeof CLOSE_INGREDIENT;
}

export type TIngredientAction = IOpenIngredient | IRemoveIngredient


export const openIngredient = (ingredient: IOrderRequest): IOpenIngredient => {
    return {
        type: OPEN_INGREDIENT,
        payload: ingredient.orders
    }
}

export const removeIngredient = (): IRemoveIngredient => {
    return {
        type: CLOSE_INGREDIENT,
    }
}

export const getIngredient: AppThunk = (data) => (dispatch: AppDispatch) => {
    getOrder(data)
        .then(checkResponse)
        .then(res => dispatch(openIngredient(res)))
        .catch(err => console.log(err));
}
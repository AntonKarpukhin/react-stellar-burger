import { checkResponse, initialData } from "../../utils/burger-api";
import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../types/constant";
import { IIngredientInterface, IIngredientRequest } from "../types/ingredient-types";
import { AppDispatch, AppThunk } from "../store/store-types";


export interface IGetIngredientsInitial {
    readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: IIngredientInterface[];
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsAction = IGetIngredientsInitial | IGetIngredientsSuccess | IGetIngredientsFailed;

export const getFeed: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsInitial());
    initialData()
        .then(checkResponse)
        .then(res => dispatch(getIngredientsSuccess(res)))
        .catch(err => dispatch(getIngredientsFailed()));
}

export const getIngredientsInitial = (): IGetIngredientsInitial => {
    return {
        type: GET_INGREDIENTS
    }
}

export const getIngredientsSuccess = (ingredients: IIngredientRequest): IGetIngredientsSuccess => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients.data
    }
}

export const getIngredientsFailed = (): IGetIngredientsFailed => {
    return {
        type: GET_INGREDIENTS_FAILED
    }
}
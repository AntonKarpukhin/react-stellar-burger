import { checkResponse, initialData } from "../../utils/burger-api";

export const getFeed = () => (dispatch) => {
    dispatch(getIngredientsInitial());
    initialData()
        .then(checkResponse)
        .then(res => dispatch(getIngredientsSuccess(res)))
        .catch(err => dispatch(getIngredientsFailed()));
}

export const getIngredientsInitial = () => {
    return {
        type: 'GET_INGREDIENTS'
    }
}

export const getIngredientsSuccess = (ingredients) => {
    return {
        type: 'GET_INGREDIENTS_SUCCESS',
        payload: ingredients
    }
}

export const getIngredientsFailed = () => {
    return {
        type: 'GET_INGREDIENTS_FAILED'
    }
}
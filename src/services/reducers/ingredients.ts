import { TIngredientsAction } from "../actions/ingredientsAction";
import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../types/constant";
import { IIngredientInterface } from "../types/ingredient-types";

interface IIngredientsState {
    ingredients: IIngredientInterface[],
    feedRequest: boolean,
    feedFailed: boolean,
}

const initialState: IIngredientsState = {
    ingredients: [],
    feedRequest: true,
    feedFailed: false,
}

const ingredients = (state: IIngredientsState = initialState, action: TIngredientsAction) => {
    switch ( action.type ) {
        case GET_INGREDIENTS:
            return {
                ...state,
                feedRequest: true,
                feedFailed: false,
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                feedRequest: false,
                feedFailed: false,
            }
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredients: [],
                feedRequest: false,
                feedFailed: true,
            }
        default: {
            return state
        }
    }
}

export default ingredients;
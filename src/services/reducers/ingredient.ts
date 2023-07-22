import { TIngredientAction } from "../actions/ingredientAction";
import { IOneOrder } from "../types/order";

interface IIngredientState {
    ingredientData: IOneOrder
}

const initialState: IIngredientState = {
    ingredientData: {
        _id: '',
        ingredients: ['', ''],
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 0
    }
}

const ingredientReducer = (state: IIngredientState = initialState, action: TIngredientAction) => {
    switch ( action.type ) {
        case "OPEN_INGREDIENT":
            // console.log(action.payload[0])
            return {
                ...state,
                ingredientData: action.payload[0]
            }
        case "CLOSE_INGREDIENT":
            return {
                ...state,
                ingredientData: {}
            }
        default: {
            return state
        }
    }
}


export default ingredientReducer;
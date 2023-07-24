import type { TConstructorBurgerAction } from '../actions/constructorBurgerAction';
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from "../types/constant";
import { IIngredientInterface } from "../types/ingredient-types";

interface IConstructorBurgerState {
    ingredients: IIngredientInterface[];
    bun: null | IIngredientInterface;
}

const initialState: IConstructorBurgerState = {
    ingredients: [],
    bun: null,
}

const constructorBurger = (state: IConstructorBurgerState = initialState, action: TConstructorBurgerAction): IConstructorBurgerState => {
    switch ( action.type ) {
        case ADD_INGREDIENT:
            if ( action.payload.type === 'bun' ) {
                return {
                    ...state,
                    bun: action.payload
                }
            }
            return {
                ...state,
                ingredients: [ ...state.ingredients, action.payload ]
            }
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((item: IIngredientInterface)  => item.key !== action.payload)
            }
        case MOVE_INGREDIENT:
            const newIngredients: IConstructorBurgerState['ingredients'] = [...state.ingredients]
            const index = newIngredients[action.payload.dragIndex];
            newIngredients.splice(action.payload.dragIndex, 1);
            newIngredients.splice(action.payload.hoverIndex, 0, index)
            return {
                ...state,
                ingredients: newIngredients
            }
        default:
            return state
    }
}

export default constructorBurger;
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from "../types/constant";
import { IIngredientInterface } from "../types/ingredient-types";

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: IIngredientInterface;
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: string;
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    readonly payload: { "dragIndex": number, "hoverIndex": number };
}

export type TConstructorBurgerAction = IAddIngredient | IDeleteIngredient | IMoveIngredient;

export const addIngredient = (ingredient: IIngredientInterface): IAddIngredient => {
    return {
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}

export const deleteIngredient = (key: string): IDeleteIngredient => {
    return {
        type: DELETE_INGREDIENT,
        payload: key
    }
}

export const moveIngredient = (index: { "dragIndex": number, "hoverIndex": number }): IMoveIngredient => {
    return {
        type: MOVE_INGREDIENT,
        payload: index
    }
}

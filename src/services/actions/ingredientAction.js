import { checkResponse, getOrder } from "../../utils/burger-api";


export const openIngredient = (ingredient) => {
    return {
        type: 'OPEN_INGREDIENT',
        payload: ingredient
    }
}

export const removeIngredient = () => {
    return {
        type: 'CLOSE_INGREDIENT',
    }
}

export const getIngredient = (data) => (dispatch) => {
    getOrder(data)
        .then(checkResponse)
        .then(res => dispatch(openIngredient(res)))
        .catch(err => console.log(err));
}
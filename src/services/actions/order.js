import { checkResponse, postOrder } from "../../utils/burger-api";


export const postFeed = (data) => (dispatch) => {
    dispatch(postOrdered());
    postOrder(data)
        .then(checkResponse)
        .then(res => dispatch(postOrderSuccess(res.order.number)))
        .catch(err => dispatch(postOrderFailed()))
}


export const postOrdered = () => {
    return {
        type: 'POST_ORDER'
    }
}

export const postOrderSuccess = (heroes) => {
    return {
        type: 'POST_ORDER_SUCCESS',
        payload: heroes
    }
}

export const postOrderFailed = () => {
    return {
        type: 'POST_ORDER_FAILED'
    }
}

export const addIngredientId = (ingredient) => {
    return {
        type: 'ADD_INGREDIENT_ID',
        payload: ingredient._id
    }
}

export const removeOrderId = () => {
    return {
        type: 'REMOVE_ORDER_ID',
    }
}
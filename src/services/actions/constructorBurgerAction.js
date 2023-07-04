export const addIngredient = (ingredient) => {
    return {
        type: 'ADD_INGREDIENT',
        payload: ingredient
    }
}

export const deleteIngredient = (key) => {
    return {
        type: 'DELETE_INGREDIENT',
        payload: key
    }
}

export const moveIngredient = (index) => {
    return {
        type: 'MOVE_INGREDIENT',
        payload: index
    }
}
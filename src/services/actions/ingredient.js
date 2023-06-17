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
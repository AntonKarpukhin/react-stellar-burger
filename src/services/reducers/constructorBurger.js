const initialState = {
    ingredients: [],
    bun: null,
}

const constructorBurger = (state = initialState, action) => {
    switch ( action.type ) {
        case "ADD_INGREDIENT":
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                }
            }
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case "DELETE_INGREDIENT":
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.key !== action.payload)
            }
        case "MOVE_INGREDIENT":
            const newIngredients = [...state.ingredients]
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
const initialState = {
    ingredientData: {}
}

const ingredientReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case "OPEN_INGREDIENT":
            return {
                ...state,
                ingredientData: action.payload
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
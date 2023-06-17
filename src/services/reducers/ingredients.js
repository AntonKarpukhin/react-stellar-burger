const initialState = {
    ingredients: [],
    feedRequest: true,
    feedFailed: false,
}

const ingredients = (state = initialState, action) => {
    switch ( action.type ) {
        case "GET_INGREDIENTS":
            return {
                ...state,
                feedRequest: true,
                feedFailed: false,
            }
        case "GET_INGREDIENTS_SUCCESS":
            return {
                ...state,
                ingredients: action.payload,
                feedRequest: false,
                feedFailed: false,
            }
        case "GET_INGREDIENTS_FAILED":
            return {
                ...state,
                feedRequest: false,
                feedFailed: true,
            }
        default: {
            return state
        }
    }
}

export default ingredients;
const initialState = {
    orderID: 0,
    ingredientsID: [],
    feedRequest: false,
    feedFailed: false,
}

const order = (state = initialState, action) => {
    switch ( action.type ) {
        case "POST_ORDER":
            return {
                ...state,
                feedRequest: true,
                feedFailed: false,
            }
        case "POST_ORDER_SUCCESS":
            return {
                ...state,
                orderID: action.payload,
                feedRequest: false,
                feedFailed: false,
            }
        case "POST_ORDER_FAILED":
            return {
                ...state,
                orderID: 0,
                ingredientsID: [],
                feedRequest: false,
                feedFailed: true,
            }
        case "ADD_INGREDIENT_ID":
            return {
                ...state,
                ingredientsID: [...state.ingredientsID, action.payload]
            }
        case "REMOVE_ORDER_ID":
            return {
                ...state,
                orderID: 0
            }
        default: {
            return state
        }
    }
}


export default order;
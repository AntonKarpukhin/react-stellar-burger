const initialState = {
    feedRequest: false,
    feedFailed: false,
    isAuthenticated: false,
    name: '',
    login: '',
}

const userReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case "POST_AUTHORIZATION":
            return {
                ...state,
                feedRequest: true,
                feedFailed: false
            }
        case "POST_AUTHORIZATION_SUCCESS":
            return {
                ...state,
                feedRequest: false,
                feedFailed: false,
                isAuthenticated: true,
                name: action.payload.user.name,
                login: action.payload.user.email
            }
        case "POST_AUTHORIZATION_FAILED":
            return {
                ...state,
                feedRequest: false,
                feedFailed: true,
                isAuthenticated: false,
                name: '',
                login: ''
            }
        case "CHANGE_USER_UPDATE":
            return {
                ...state,
                name: action.payload.user.name,
                login: action.payload.user.email,
            }
        case "LOG_OUT_USER":
            return {
                ...state,
                feedRequest: false,
                feedFailed: false,
                isAuthenticated: false,
                name: '',
                login: ''
            }
        default: {
            return state
        }
    }
}

export default userReducer;
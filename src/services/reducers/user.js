const initialState = {
    feedRequest: false,
    feedFailed: false,
    isAuthenticated: false,
    name: '',
    login: '',
    accessToken: '',
    refreshToken: ''
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

            localStorage.setItem('user', JSON.stringify(action.payload));
            const {accessToken, refreshToken, user} = JSON.parse(localStorage.getItem('user'));
            return {
                ...state,
                feedRequest: false,
                feedFailed: false,
                isAuthenticated: true,
                name: user.name,
                login: user.email,
                accessToken,
                refreshToken
            }
        case "POST_AUTHORIZATION_FAILED":
            return {
                ...state,
                feedRequest: false,
                feedFailed: true,
                isAuthenticated: false,
                name: '',
                login: '',
                accessToken: '',
                refreshToken: ''
            }
        case "SET_USERDATA_LOCALSTORAGE":
            return {
                ...state,
                feedRequest: false,
                feedFailed: false,
                isAuthenticated: true,
                name: action.payload.user.name,
                login: action.payload.user.email,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        case "CHANGE_USER_UPDATE":
            const oldUser = JSON.parse(localStorage.getItem('user'));
            const newUser = {...oldUser, user: action.payload.user}
            localStorage.setItem('user', JSON.stringify(newUser));
            return {
                ...state,
                feedRequest: false,
                feedFailed: false,
                isAuthenticated: true,
                name: newUser.user.name,
                login: newUser.user.email,
                accessToken: newUser.accessToken,
                refreshToken: newUser.refreshToken
            }
        case "LOG_OUT_USER":
            localStorage.removeItem('user');
            return {
                ...state,
                feedRequest: false,
                feedFailed: false,
                isAuthenticated: false,
                name: '',
                login: '',
                accessToken: '',
                refreshToken: ''
            }
        default: {
            return state
        }
    }
}

export default userReducer;
import {
    CHANGE_USER_UPDATE,
    LOG_OUT_USER,
    POST_AUTHORIZATION,
    POST_AUTHORIZATION_FAILED,
    POST_AUTHORIZATION_SUCCESS
} from "../types/constant";
import { TUserAction } from "../actions/userAction";

interface IUserState {
    feedRequest: boolean,
    feedFailed: boolean,
    isAuthenticated: boolean,
    name: string,
    login: string,
}

const initialState: IUserState = {
    feedRequest: false,
    feedFailed: false,
    isAuthenticated: false,
    name: '',
    login: '',
}

const userReducer = (state: IUserState = initialState, action: TUserAction) => {
    switch ( action.type ) {
        case POST_AUTHORIZATION:
            return {
                ...state,
                feedRequest: true,
                feedFailed: false
            }
        case POST_AUTHORIZATION_SUCCESS:
            return {
                ...state,
                feedRequest: false,
                feedFailed: false,
                isAuthenticated: true,
                name: action.payload.user.name,
                login: action.payload.user.email
            }
        case POST_AUTHORIZATION_FAILED:
            return {
                ...state,
                feedRequest: false,
                feedFailed: true,
                isAuthenticated: false,
                name: '',
                login: ''
            }
        case CHANGE_USER_UPDATE:
            return {
                ...state,
                name: action.payload.user.name,
                login: action.payload.user.email,
            }
        case LOG_OUT_USER:
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
import {
    checkResponse, fetchWithRefresh, postLoginUser, postLogOut
} from "../../utils/burger-api";
import {
    CHANGE_USER_UPDATE,
    LOG_OUT_USER,
    POST_AUTHORIZATION,
    POST_AUTHORIZATION_FAILED,
    POST_AUTHORIZATION_SUCCESS
} from "../types/constant";
import { IUserInterface } from "../types/user-types";
import { AppDispatch, AppThunk } from "../store/store-types";


export interface IGetUserDataInitial {
    readonly type: typeof POST_AUTHORIZATION;
}

export interface IGetUserSuccess {
    readonly type: typeof POST_AUTHORIZATION_SUCCESS;
    readonly payload: IUserInterface;
}

export interface IGetUserDataFailed {
    readonly type: typeof POST_AUTHORIZATION_FAILED;
}

export interface ILogOutUser {
    readonly type: typeof LOG_OUT_USER;
}

export interface IChangeUser {
    readonly type: typeof CHANGE_USER_UPDATE;
    readonly payload: IUserInterface;
}

export type TUserAction = IGetUserDataInitial | IGetUserSuccess | IGetUserDataFailed | ILogOutUser | IChangeUser;

export const getLoginData: AppThunk = data => (dispatch: AppDispatch) => {
    dispatch(getUserDataInitial());
    postLoginUser(data)
        .then(checkResponse)
        .then(res => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(getUserSuccess(res))
        })
        .catch(err => dispatch(getUserDataFailed()))
}

export const postLogOutUser: AppThunk = data => (dispatch: AppDispatch) => {
    postLogOut(data)
        .then(checkResponse)
        .then(res => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(logOutUser())
        })
        .catch(err => console.log(err))
}

export const checkUserAuth: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        if (localStorage.getItem("accessToken")) {
            fetchWithRefresh(localStorage.getItem("accessToken"))
                .then(res => dispatch(getUserSuccess(res)))
                .catch(err => dispatch(getUserDataFailed()))
        }
    };
};

export const changeUserData: AppThunk = (method, endpoint) => (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
        fetchWithRefresh(localStorage.getItem("accessToken"), method, endpoint )
            .then(res => dispatch(changeUser(res)))
            .catch(err => console.log(err))
    }
}

export const getUserDataInitial = (): IGetUserDataInitial => {
    return {
        type: POST_AUTHORIZATION
    }
}

export const getUserSuccess = (user: IUserInterface): IGetUserSuccess => {
    return {
        type: POST_AUTHORIZATION_SUCCESS,
        payload: user
    }
}

export const getUserDataFailed = (): IGetUserDataFailed => {
    return {
        type: POST_AUTHORIZATION_FAILED
    }
}

export const logOutUser = (): ILogOutUser => {
    return {
        type: LOG_OUT_USER
    }
}

export const changeUser = (data: IUserInterface): IChangeUser => {
    return {
        type: CHANGE_USER_UPDATE,
        payload: data
    }
}
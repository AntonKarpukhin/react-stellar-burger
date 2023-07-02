import { changeDataUser, checkResponse, getAuthorization, postLogOut } from "../../utils/burger-api";

export const registrationUserData = data => dispatch => {
    dispatch(getUserDataInitial());
    getAuthorization(data)
        .then(checkResponse)
        .then(res => dispatch(getUserSuccess(res)))
        .catch(err => dispatch(getUserDataFailed()))
}


export const changeUserData = data => dispatch => {
    changeDataUser(data)
        .then(checkResponse)
        .then(res => dispatch(changeUser(res)))
        .catch(err => console.log(err))
}


export const postLogOutUser = data => dispatch => {
    postLogOut(data)
        .then(checkResponse)
        .then(res => dispatch(logOutUser()))
        .catch(err => console.log(err))
}

export const getUserDataInitial = () => {
    return {
        type: 'POST_AUTHORIZATION'
    }
}

export const getUserSuccess = (user) => {
    return {
        type: 'POST_AUTHORIZATION_SUCCESS',
        payload: user
    }
}

export const getUserDataFailed = () => {
    return {
        type: 'POST_AUTHORIZATION_FAILED'
    }
}

export const setUserDataLocalStorage = (data) => {
    return {
        type: 'SET_USERDATA_LOCALSTORAGE',
        payload: data
    }
}

export const logOutUser = () => {
    return {
        type: 'LOG_OUT_USER'
    }
}

export const changeUser = (data) => {
    return {
        type: 'CHANGE_USER_UPDATE',
        payload: data
    }
}
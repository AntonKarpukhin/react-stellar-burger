import {
    checkResponse,
    fetchWithRefresh, postLoginUser,
    postLogOut
} from "../../utils/burger-api";

export const getLoginData = data => dispatch => {
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

export const postLogOutUser = data => dispatch => {
    postLogOut(data)
        .then(checkResponse)
        .then(res => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(logOutUser())
        })
        .catch(err => console.log(err))
}

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            fetchWithRefresh(localStorage.getItem("accessToken"))
                .then(res => dispatch(getUserSuccess(res)))
                .catch(err => dispatch(getUserDataFailed()))
        }
    };
};

export const changeUserData = (method, endpoint) => dispatch => {
    if (localStorage.getItem("accessToken")) {
        fetchWithRefresh(localStorage.getItem("accessToken"), method, endpoint )
            .then(res => dispatch(changeUser(res)))
            .catch(err => console.log(err))
    }
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
import { dataUrl } from "./data";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function postOrder(data, token) {
    return fetch(`${dataUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },
        body: JSON.stringify({
            ingredients: data
        })
    })
}

function initialData() {
    return  fetch(`${dataUrl}/ingredients`)
}

const fetchWithRefresh = async ( token, method, endpoint) => {
    const config = {
        method: method,
        headers: {
            'Content-Type': "application/json",
            authorization: token
        },
        body: JSON.stringify(endpoint)
    }
    try {
        const res = await fetch(`${dataUrl}/auth/user`, config);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            config.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${dataUrl}/auth/user`, config);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const refreshToken = () => {
    return fetch(`${dataUrl}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};


function postRegistration(data) {
    const {email, password, name} = data
    return fetch(`${dataUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password, name
        })
    })
}

const postLoginUser = (data) => {
    return fetch(`${dataUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

function postLogOut(data) {
    return fetch(`${dataUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: data
        })
    })
}

function resetPassword(data) {
    return fetch(`${dataUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data
        })
    })
}

function saveNewPassword(data) {
    const {password, token} = data;
    return fetch(`${dataUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            token
        })
    })
}

function getOrder(order) {
    return  fetch(`${dataUrl}/orders/${order}`)
}


export {checkResponse, postOrder, initialData, resetPassword, saveNewPassword, postRegistration, postLogOut, fetchWithRefresh,  postLoginUser, getOrder}
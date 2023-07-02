import { dataUrl } from "./data";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function postOrder(data) {
    return fetch(`${dataUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: data
        })
    })
}

function initialData() {
    return  fetch(`${dataUrl}/ingredients`)
}

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

function getAuthorization(data) {
    const {email, password} = data
    return fetch(`${dataUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
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
    return fetch(`${dataUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data
        })
    })
}

function changeDataUser(data) {
    const {token, name, email} = data
    return fetch(`${dataUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify({
            name,
            email
        })
    })
}




export {checkResponse, postOrder, initialData, resetPassword, saveNewPassword, postRegistration, getAuthorization, changeDataUser, postLogOut}
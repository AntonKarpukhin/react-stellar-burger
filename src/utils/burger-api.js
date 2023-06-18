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


export {checkResponse, postOrder, initialData}
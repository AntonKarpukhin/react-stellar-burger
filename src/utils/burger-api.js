const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function postOrder(data) {
    return fetch('https://norma.nomoreparties.space/api/orders', {
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
    return  fetch('https://norma.nomoreparties.space/api/ingredients')
}


export {checkResponse, postOrder, initialData}
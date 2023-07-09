export const dataUrl = "https://norma.nomoreparties.space/api";
export const wsUrlFeed = "wss://norma.nomoreparties.space/orders/all";

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
export const wsUrlUserFeed = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const WebsocketStatus  = {
    CONNECTING:  'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export const routeMain = "/";
export const routeLogin = "/login";
export const routeOrderFeed = "/feed";
export const routeOrderFeedId = "/:orderId";
export const routeProfileFeed = "orders";
export const routeRegister = "/register";
export const routeUser= "/user";
export const routeProfile = "profile";
export const routeForgotPassword = "/forgot-password";
export const routeResetPassword = "/reset-password";
export const routeIngredients = "/ingredients";
export const routeIngredientId = "/:ingredientId";
export const route404 = "*";

// /user/orders
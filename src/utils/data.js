export const dataUrl = "https://norma.nomoreparties.space/api";
export const wsUrlFeed = "wss://norma.nomoreparties.space/orders/all";

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
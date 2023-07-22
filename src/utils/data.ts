export const dataUrl: "https://norma.nomoreparties.space/api" = "https://norma.nomoreparties.space/api";
export const wsUrlFeed: "wss://norma.nomoreparties.space/orders/all" = "wss://norma.nomoreparties.space/orders/all";

const accessToken: string | undefined = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')?.slice(7) : '';
export const wsUrlUserFeed: string = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

interface IWebsocketStatus {
    CONNECTING:  'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export const WebsocketStatus: IWebsocketStatus  = {
    CONNECTING:  'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export const routeMain: "/" = "/";
export const routeLogin: "/login" = "/login";
export const routeOrderFeed: "/feed" = "/feed";
export const routeOrderFeedId: "/:orderId" = "/:orderId";
export const routeProfileFeed: "orders" = "orders";
export const routeRegister: "/register" = "/register";
export const routeUser: "/user" = "/user";
export const routeProfile: "profile" = "profile";
export const routeForgotPassword: "/forgot-password" = "/forgot-password";
export const routeResetPassword: "/reset-password" = "/reset-password";
export const routeIngredients: "/ingredients" = "/ingredients";
export const routeIngredientId: "/:ingredientId" = "/:ingredientId";
export const route404: "*" = "*";
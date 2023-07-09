const userFeedMiddleware = (wsActions) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
            const wsUrlUserFeed = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

            if (type === wsConnect) {
                socket = new WebSocket(wsUrlUserFeed);
                dispatch({type: wsConnecting});
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };
                socket.onerror = () => {
                    dispatch({ type: onError, payload: onError });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onMessage, payload: parsedData });
                };
                socket.onclose = () => {
                    dispatch({ type: onClose });
                };
                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        };
    };
};

export default userFeedMiddleware;
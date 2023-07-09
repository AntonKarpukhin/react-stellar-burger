const socketFeedMiddleware = (wsActions) => {
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

            if (type === wsConnect) {
                socket = new WebSocket(action.payload);
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

export default socketFeedMiddleware;
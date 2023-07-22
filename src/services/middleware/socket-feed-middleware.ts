import { TWsActions } from "./socket-types";
import { TUserFeedAction } from "../actions/user-feed-action";
import { TOrderFeedAction } from "../actions/order-feed-action";

const socketFeedMiddleware = (wsActions: TWsActions) => {
    return (store: { dispatch: (type: TUserFeedAction | TOrderFeedAction) => void; }) => {
        let socket: WebSocket | null= null;

        return (next: (arg0: TUserFeedAction | TOrderFeedAction) => void) => (action: TUserFeedAction | TOrderFeedAction) => {
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
                socket.onmessage = (event: MessageEvent) => {
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



import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
    // const isAuthChecked = useSelector(state => state.userReducer.isAuthenticated);
    const user = useSelector(state => state.userReducer.name);
    const location = useLocation();

    // if (!isAuthChecked) {
    //     return null;
    // }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
);

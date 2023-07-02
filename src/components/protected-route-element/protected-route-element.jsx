import { Entrance } from "../../pages";
import { useSelector } from "react-redux";

export const ProtectedRouteElement = ({ element }) => {

    const user = useSelector(state => state.userReducer);

    return user ? element : <Entrance to="/login" replace/>;
}
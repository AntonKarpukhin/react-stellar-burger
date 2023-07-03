import style from "./app.module.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
    Entrance, ForgotPassword, Registration, ResetPassword, Profile, NotFound404, IngredientPage, Home
} from "../../pages";

import { useEffect} from "react";
import { useDispatch } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { checkUserAuth } from "../../services/actions/userAction";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import {
    route404,
    routeForgotPassword, routeIngredientId,
    routeIngredients,
    routeLogin,
    routeMain,
    routeProfile,
    routeRegister,
    routeResetPassword
} from "../../utils/data";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);


    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

  return (
    <div className={style.app}>
        <DndProvider backend={HTML5Backend}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path={routeLogin} element={<OnlyUnAuth component={<Entrance/>}/>}/>
                <Route path={routeRegister} element={<OnlyUnAuth component={<Registration/>}/>}/>
                <Route path={routeProfile} element={<OnlyAuth component={<Profile/>}/>}/>
                <Route path={routeForgotPassword} element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                <Route path={routeResetPassword} element={<ResetPassword/>}/>
                <Route path={routeMain} element={<Home/>}/>
                <Route path={`${routeIngredients}${routeIngredientId}`} element={<IngredientPage/>}/>
                <Route path={route404} element={<NotFound404/>}/>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path={`${routeIngredients}${routeIngredientId}`}
                        element={
                            <Modal closeModal={handleModalClose}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </DndProvider>
    </div>
  );
}

export default App;
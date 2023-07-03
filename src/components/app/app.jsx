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
                <Route path="/login" element={<OnlyUnAuth component={<Entrance/>}/>}/>
                <Route path="/register" element={<OnlyUnAuth component={<Registration/>}/>}/>
                <Route path="/profile" element={<OnlyAuth component={<Profile/>}/>}/>
                <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                {/*<Route path="/forgot-password" element={<ForgotPassword/>}/>*/}
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/ingredients/:ingredientId" element={<IngredientPage/>}/>
                <Route path="*" element={<NotFound404/>}/>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
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
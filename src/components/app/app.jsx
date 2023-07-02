import style from "./app.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
    Entrance,
    ForgotPassword,
    Registration,
    ResetPassword,
    Profile,
    NotFound404, IngredientPage
} from "../../pages";
import { LayoutMain } from "../layout-main/layout-main";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDataLocalStorage } from "../../services/actions/userAction";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { openIngredient, removeIngredient } from "../../services/actions/ingredientAction";

function App() {

    const [modal, setModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();

    let location = useLocation();
    let background =  location.state && location.state.background;

    //

    console.log(background)

    useEffect(() => {
        if (user) {
            dispatch(setUserDataLocalStorage(user))
        }
    }, [])

    const openModal = (item) => {
        dispatch(openIngredient(item))
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        dispatch(removeIngredient())
    }

  return (
    <div className={style.app}>
        <DndProvider backend={HTML5Backend}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/login" element={<Entrance/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>}/>}/>
                <Route path="/" element={<LayoutMain openModal={openModal}/>}/>
                <Route path="/ingredient/:ingredientId" element={<IngredientPage/>}/>
                <Route path="*" element={<NotFound404/>}/>
                {background && modal && <Route path="/ingredient/:ingredientId" element={<Modal path="/ingredient/:ingredientId" closeModal={closeModal}><IngredientDetails /></Modal>}/>}

            </Routes>
        </DndProvider>
    </div>
  );
}

export default App;
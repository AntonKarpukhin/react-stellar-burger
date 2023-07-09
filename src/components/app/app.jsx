import style from "./app.module.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
    Entrance, ForgotPassword, Registration, ResetPassword, Profile, NotFound404, IngredientPage, Home, OrderFeed, Order
} from "../../pages";

import { useEffect} from "react";
import { useDispatch } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { checkUserAuth } from "../../services/actions/userAction";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import {
    route404,
    routeForgotPassword,
    routeIngredientId,
    routeIngredients,
    routeLogin,
    routeMain,
    routeUser,
    routeRegister,
    routeResetPassword,
    routeProfile,
    routeOrderFeed,
    routeProfileFeed, routeOrderFeedId,
} from "../../utils/data";
import { ProfileInfo } from "../profile-info/profile-info";
import { ProfileFeed } from "../profile-feed/profile-feed";
import { OneOrder } from "../one-order/one-order";
import {  WS_ORDER_FEED_CONNECT } from "../../services/actions/order-feed-action";
import { getFeed } from "../../services/actions/ingredientsAction";
import { WS_USER_FEED_CONNECT } from "../../services/actions/user-feed-action";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
        dispatch({type: WS_ORDER_FEED_CONNECT})
        dispatch({type: WS_USER_FEED_CONNECT})
        dispatch(getFeed())
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const background = location.state && location.state.background;
    const backgroundTwo = location.state && location.state.backgroundTwo;

    const handleModalClose = () => {
        navigate(-1);
    };

    return (
    <div className={style.app}>
        <DndProvider backend={HTML5Backend}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path={routeOrderFeed} element={<OrderFeed/>}/>
                <Route path={`${routeOrderFeed}${routeOrderFeedId}`} element={<Order/>}/>
                <Route path={routeLogin} element={<OnlyUnAuth component={<Entrance/>}/>}/>
                <Route path={routeRegister} element={<OnlyUnAuth component={<Registration/>}/>}/>
                <Route path={routeUser} element={<OnlyAuth component={<Profile/>}/>}>
                    <Route index element={<ProfileInfo />} />
                    <Route path={routeProfile} element={<OnlyAuth component={<ProfileInfo/>}/>}/>
                    <Route path={routeProfileFeed} element={<OnlyAuth component={<ProfileFeed/>}/>}/>
                </Route>
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
            {backgroundTwo && (
                <Routes>
                    <Route
                        path={`${routeOrderFeed}${routeOrderFeedId}`}
                        element={
                            <Modal closeModal={handleModalClose}>
                                <OneOrder />
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
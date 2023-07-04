import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import ingredients from "../reducers/ingredients";
import constructorBurger from "../reducers/constructorBurger";
import order from "../reducers/order";
import ingredient from "../reducers/ingredient";
import userReducer from '../reducers/user'

const rootReducer = createStore(
    combineReducers({ ingredients, constructorBurger, ingredient, order, userReducer }),
    compose(applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default rootReducer;
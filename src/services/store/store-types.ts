import rootReducer from "./index";
import { TConstructorBurgerAction } from "../actions/constructorBurgerAction";
import { TIngredientAction } from "../actions/ingredientAction";
import { TIngredientsAction } from "../actions/ingredientsAction";
import { TOrderFeedAction } from "../actions/order-feed-action";
import { TOrderAction } from "../actions/orderAction";
import { TUserFeedAction } from "../actions/user-feed-action";
import { TUserAction } from "../actions/userAction";

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

export type TRootState = ReturnType<typeof rootReducer.getState>;

export type TApplicationActions = TConstructorBurgerAction | TIngredientAction | TIngredientsAction | TOrderFeedAction | TOrderAction | TUserFeedAction | TUserAction;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type AppDispatch = typeof rootReducer.dispatch;



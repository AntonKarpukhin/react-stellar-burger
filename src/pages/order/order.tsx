import style from './order.module.css';
import { IngredientSmall } from "../../components/ingredient-small/ingredient-small";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
    connect as connectFeedTable, disconnect as disconnectFeedTable
} from "../../services/actions/order-feed-action";
import { wsUrlFeed } from "../../utils/data";
import { IOneOrder } from "../../services/types/order";
import { IIngredientInterface } from "../../services/types/ingredient-types";

export const Order = () => {

    const ingredientsData = useSelector(state => state.ingredients.ingredients)
    const location = useLocation()
    // @ts-ignore
    const orders = useSelector(state => state.orderFeedReducer.orders.orders)

    const ingredientId = location.pathname.slice(6)
    const order = orders && orders.find((item: IOneOrder) => item.number === +ingredientId)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectFeedTable(wsUrlFeed))
        return () => {
            dispatch(disconnectFeedTable())
        }
    },[])

    const total = useMemo<number | void>(() => {
        order && ingredientsData && order.ingredients.reduce((a: number, b: string) => {
            ingredientsData && ingredientsData.forEach(item => {
                if (item._id=== b) {
                    a += item.price
                }
            })
            return a
        }, 0)
    }, [order, ingredientsData])

    const checkStatus = (type: string) => {
        switch ( type ) {
            case "done":
                return 'Выполнен'
            default:
                return 'Выполнен'
        }
    }

    const checkTotalIngredient = (ingredients: IIngredientInterface[], order: IOneOrder) => {

        const duplicates = order.ingredients.filter((number, index, numbers) => {
            return numbers.indexOf(number) !== index;
        });

        const counter = order.ingredients.filter(item => item === duplicates[0]).length

        const notDuplicates = order.ingredients.filter(item => item !== duplicates[0]).map(item => ({item, total: 1}))

        const newIngredients =  [{item: duplicates[0], total: counter}]

        return [ ...notDuplicates, ...newIngredients ]
    }

    const lengthIngredient = ingredientsData && order && checkTotalIngredient(ingredientsData, order).length

    return (
        <section className={style.orderWrapper}>
            <p className={ `${ style.order } text text_type_digits-default` }>{`#${order && order.number}`}</p>
            <p className={`${style.boon} text text_type_main-medium`}>{order && order.name}</p>
            <p className={`${style.good} text text_type_main-small text_color_inactive`}>{order && checkStatus(order.status)}</p>
            <p className={`${style.brom} text text_type_main-medium`}>Состав:</p>
            <div className={`${style.wrapper} ${lengthIngredient > 4 ? `${style.wrapperScroll} custom-scroll` : ''}`}>
                {ingredientsData && order && checkTotalIngredient(ingredientsData, order).map((item, i) => <IngredientSmall key={i} item={item}/>)}
            </div>
            <div className={style.wrapperPrice}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order && order.updatedAt)} />
                </p>
                <div className={style.price}>
                    <p className="text text_type_digits-default">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    )
}
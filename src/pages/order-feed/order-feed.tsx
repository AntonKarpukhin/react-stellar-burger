import style from './order-feed.module.css';
import { Order } from "../../components/order/order";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useEffect } from "react";
import {connect as connectFeedTable, disconnect as disconnectFeedTable} from '../../services/actions/order-feed-action';
import { wsUrlFeed } from "../../utils/data";
import { IOneOrder } from "../../services/types/order";

export const OrderFeed = () => {

// @ts-ignore
    const {orders, total, totalToday} = useSelector(state => state.orderFeedReducer.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectFeedTable(wsUrlFeed))
        return () => {
            dispatch(disconnectFeedTable())
        }
    },[])

    const done = orders && orders.map((item: IOneOrder) => {
        if (item.status === 'done') {
            return item.number
        }
    }).slice(0, 7);

    const pending = orders && orders.map((item: IOneOrder) => {
        if (item.status === 'pending') {
            return item.number
        }
    }).slice(0, 7);

    return (
        <section className={style.section}>
            <h2 className="text text_type_main-large">Лента заказов</h2>
            <div className={style.wrapperOrder}>
                <div className={`${style.itemsFeed} custom-scroll`}>
                    {orders && orders.map((item: IOneOrder) => <Order key={item._id} order={item}/>)}
                </div>
                <div className={style.wrapperInfo}>
                    <div className={style.wrapperOrders}>
                        <div>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={style.wrapperNumber}>
                                {orders && done && done.map((item: IOneOrder, i: number) => <p key={i} className="text text_type_digits-default text_color_inactive">{item}</p>)}
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={style.wrapperNumber}>
                                {orders && pending && pending.map((item: IOneOrder, i: number) => <p key={i} className="text text_type_digits-default text_color_inactive">{item}</p>)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className="text text_type_digits-large">{total}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">{totalToday}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
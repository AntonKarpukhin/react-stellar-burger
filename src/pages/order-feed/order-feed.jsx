import style from './order-feed.module.css';
import { Order } from "../../components/order/order";
import { useSelector } from "react-redux";


export const OrderFeed = () => {

    const {orders, total, totalToday} = useSelector(state => state.orderFeedReducer.orders);

    return (
        <section className={style.section}>
            <h2 className="text text_type_main-large">Лента заказов</h2>
            <div className={style.wrapperOrder}>
                <div className={`${style.itemsFeed} custom-scroll`}>
                    {orders && orders.map(item => <Order key={item._id} order={item}/>)}
                </div>
                <div className={style.wrapperInfo}>
                    <div className={style.wrapperOrders}>
                        <div>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={style.wrapperNumber}>
                                {/*<p className="text text_type_digits-default text_color_inactive">123456</p>*/}
                                {/*<p className="text text_type_digits-default text_color_inactive">12345</p>*/}
                                {/*<p className="text text_type_digits-default text_color_inactive">1234567</p>*/}
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={style.wrapperNumber}>
                                {/*<p className="text text_type_digits-default">123456</p>*/}
                                {/*<p className="text text_type_digits-default">12345</p>*/}

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
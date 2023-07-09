import style from './profile-feed.module.css';
import { Order } from "../order/order";
import { useSelector } from "react-redux";

export const ProfileFeed = () => {

    const orders = useSelector(state => state.userFeedReducer.orders.orders )

    return (
        <section className={`${style.itemsFeed} custom-scroll`}>
            {orders && orders.map((item, i) => <Order key={i} order={item}/>)}
        </section>
    )
}
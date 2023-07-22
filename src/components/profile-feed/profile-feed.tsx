import style from './profile-feed.module.css';
import { Order } from "../order/order";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { FC, useEffect } from "react";
import {connect as connectUserFeedTable, disconnect as disconnectUserFeedTable} from '../../services/actions/user-feed-action';
import { wsUrlFeed, wsUrlUserFeed } from "../../utils/data";
import {
    connect as connectFeedTable, disconnect as disconnectFeedTable
} from "../../services/actions/order-feed-action";

export const ProfileFeed: FC = () => {

    const orders = useSelector(state => state.userFeedReducer.orders )
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectUserFeedTable(wsUrlUserFeed));
        dispatch(connectFeedTable(wsUrlFeed))
        return () => {
            dispatch(disconnectUserFeedTable());
            dispatch(disconnectFeedTable())
        }
    }, [])

    return (
        <section className={`${style.itemsFeed} custom-scroll`}>
            {orders && orders.map((item, i) => <Order key={i} order={item}/>)}
        </section>
    )
}
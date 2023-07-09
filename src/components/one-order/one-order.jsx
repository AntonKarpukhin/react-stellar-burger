import style from './one-order.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { IngredientSmall } from "../ingredient-small/ingredient-small";
import { useParams } from "react-router-dom";

export const OneOrder = () => {

    const orders = useSelector(state => state.orderFeedReducer.orders.orders);
    const ingredientsData = useSelector(state => state.ingredients.ingredients.data)
    const {orderId} = useParams();

    let data;

    if (!orders) {
        data = []
    } else {
        data = orders.find(item => item.number === +orderId)
    }

    const checkStatus = (type) => {
        switch ( type ) {
            case 'done':
                return 'Выполнен'
            default:
                return 'Выполнен'
        }
    }

    const total = orders && ingredientsData && data.ingredients.reduce((a, b) => {
        ingredientsData && ingredientsData.forEach(item => {
            if (item._id=== b) {
                a += item.price
            }
        })
        return a
    }, 0)


    return (
        <section className={style.oneOrder}>
            <p className={ `${ style.order } text text_type_digits-default` }>{`#${orders && data.number}`}</p>
            <p className={`${style.boon} text text_type_main-medium`}>{orders && data.name}</p>
            <p className={`${style.good} text text_type_main-small text_color_inactive`}>{orders && checkStatus(data.status)}</p>
            <p className={`${style.brom} text text_type_main-medium`}>Состав:</p>
            <div className={`${style.wrapper} custom-scroll`}>
                {orders && data.ingredients.map((item, i) => <IngredientSmall key={i} item={item}/>)}
                {/*{data && data.ingredients.map((item, i) => {*/}
                {/*    console.log(item)*/}
                {/*    return (*/}
                {/*        <div key={i} className={style.wrapper1}>*/}
                {/*            <img className={style.img} src={item.image} alt={item.name}/>*/}
                {/*            <p className="text text_type_main-default">{item.name}</p>*/}
                {/*            <div className={style.wrapperPrice1}>*/}
                {/*                <p className="text text_type_digits-default"><span>{item.total}</span>   x   <span>{item.price}</span></p>*/}
                {/*                <CurrencyIcon type="primary" />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
            <div className={style.wrapperPrice}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(orders && data.updatedAt)} />
                </p>
                <div className={style.price}>
                    <p className="text text_type_digits-default">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>

            </div>
        </section>
    )
}
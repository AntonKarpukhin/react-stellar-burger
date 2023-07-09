import style from './order.module.css';
import { IngredientSmall } from "../../components/ingredient-small/ingredient-small";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const Order = () => {

    const ingredientsData = useSelector(state => state.ingredients.ingredients.data)
    const location = useLocation()
    const orders = useSelector(state => state.orderFeedReducer.orders.orders)

    const ingredientId = location.pathname.slice(6)
    const order = orders && orders.find(item => item.number === +ingredientId)

    const total = order && ingredientsData && order.ingredients.reduce((a, b) => {
        ingredientsData && ingredientsData.forEach(item => {
            if (item._id=== b) {
                a += item.price
            }
        })
        return a
    }, 0)

    const checkStatus = (type) => {
        switch ( type ) {
            case "done":
                return 'Выполнен'
            default:
                return 'Выполнен'
        }
    }

    const checkTotalIngredient = (ingredients, order) => {
        const duplicates = order.ingredients.filter((number, index, numbers) => {
            return numbers.indexOf(number) !== index;
        });

        const notDuplicates = order.ingredients.filter((number, index, numbers) => {
            return numbers.indexOf(number) === index;
        }).map(item => ({item, total: 1}))

        const newIngredients =  [{item: duplicates[0], total: duplicates.length}]

        return[ ...notDuplicates, ...newIngredients ]
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
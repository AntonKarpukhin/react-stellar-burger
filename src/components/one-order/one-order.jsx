import style from './one-order.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { IngredientSmall } from "../ingredient-small/ingredient-small";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getIngredient, removeIngredient } from "../../services/actions/ingredientAction";

export const OneOrder = () => {

    const ingredientsData = useSelector(state => state.ingredients.ingredients.data)
    const ingredient = useSelector(state => state.ingredient.ingredientData.orders)
    const {orderId} = useParams();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getIngredient(orderId))

        return () => {
            dispatch(removeIngredient)
        }
    }, [])

    const checkStatus = (type) => {
        switch ( type ) {
            case 'done':
                return 'Выполнен'
            default:
                return 'Выполнен'
        }
    }

    const total = ingredient && ingredient[0].ingredients.reduce((a, b) => {
        ingredientsData && ingredientsData.forEach(item => {
            if (item._id=== b) {
                a += item.price
            }
        })
        return a
    }, 0)

    const checkTotalIngredient = (ingredients, order) => {

        const duplicates = order.ingredients.filter((number, index, numbers) => {
            return numbers.indexOf(number) !== index;
        });

        const counter = order.ingredients.filter(item => item === duplicates[0]).length

        const notDuplicates = order.ingredients.filter(item => item !== duplicates[0]).map(item => ({item, total: 1}))

        const newIngredients =  [{item: duplicates[0], total: counter}]

        return [ ...notDuplicates, ...newIngredients ]
    }

    return (
        <section className={style.oneOrder}>
            <p className={ `${ style.order } text text_type_digits-default` }>{`#${ingredient && ingredient[0].number}`}</p>
            <p className={`${style.boon} text text_type_main-medium`}>{ingredient && ingredient[0].name}</p>
            <p className={`${style.good} text text_type_main-small text_color_inactive`}>{ingredient && checkStatus(ingredient.status)}</p>
            <p className={`${style.brom} text text_type_main-medium`}>Состав:</p>
            <div className={`${style.wrapper} custom-scroll`}>
                {ingredientsData && ingredient && checkTotalIngredient(ingredientsData, ingredient[0]).map((item, i) => <IngredientSmall key={i} item={item}/>)}
            </div>
            <div className={style.wrapperPrice}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(ingredient && ingredient[0].updatedAt)} />
                </p>
                <div className={style.price}>
                    <p className="text text_type_digits-default">{total}</p>
                    <CurrencyIcon type="primary" />
                </div>

            </div>
        </section>
    )
}
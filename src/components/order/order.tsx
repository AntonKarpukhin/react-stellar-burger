import style from './order.module.css'

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../services/types/hooks';
import { Link, useLocation } from "react-router-dom";
import { IOrder } from "../../services/types/order";
import { FC } from "react";
import { IImages } from "../../services/types/ingredient-types";

export const Order: FC<IOrder> = (props) => {

    const ingredientsData = useSelector(state => state.ingredients.ingredients)
    const {name, number, ingredients, updatedAt} = props.order;

    const location = useLocation();

    const numberId = props.order['number']

    const total = ingredients && ingredientsData && ingredients.reduce((a, b) => {
        ingredientsData && ingredientsData.forEach(item => {
            if (item._id=== b) {
                a += item.price
            }
        })
        return a
    }, 0)

    let images: IImages[] = []

    ingredients && ingredientsData && ingredientsData.forEach(item => {
        ingredients.forEach(id => {
            if (item._id === id) {
                images.push({images: item.image_mobile, name: item.name})
            }
        })
    })

    const checkImagesCounter = () => {
        if (images.length > 5) {
            return  images.length - 5
        }
        return null
    }

    return (
        <Link to={`${location.pathname}/${numberId}`} state={{ background: location }} className={style.link}>
            <div className={style.wrapperOrder}>
                <div className={style.wrapperDate}>
                    <p className="text text_type_digits-default">{`#${number}`}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(updatedAt)} />
                    </p>
                </div>
                <p className="text text_type_main-medium">{name}</p>
                <div className={style.wrapperIngredients}>
                    <div className={style.wrapperImg}>
                        {images && images.slice(0, 5).map((item, i) => <img key={i} className={style.itemImg} src={item.images} alt={item.name}/>)}
                        {checkImagesCounter() ? <div className={style.itemImgCounter} style={{ backgroundImage: `url(${images[1].images})` }} ><p className={style.par}>{`+${checkImagesCounter()}`}</p></div> : null}
                    </div>
                    <div className={style.wrapperPrice}>
                        <p className="text text_type_digits-default">{total}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}


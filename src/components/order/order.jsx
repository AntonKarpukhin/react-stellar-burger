import style from './order.module.css'

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { routeOrderFeed } from "../../utils/data";

export const Order = (props) => {

    const ingredientsData = useSelector(state => state.ingredients.ingredients.data)
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

    let images = []

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
        <Link to={`${routeOrderFeed}/${numberId}`} state={{ backgroundTwo: location }} className={style.link}>
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


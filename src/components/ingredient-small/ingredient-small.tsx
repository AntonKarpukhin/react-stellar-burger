import style from './ingredient-small.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../services/types/hooks';
import { FC } from "react";

interface IngredientSmall {
    "item": {
        "item": string,
        "total": number
    }
}

export const IngredientSmall: FC<IngredientSmall> = (props) => {

    const ingredientsData = useSelector(state => state.ingredients.ingredients)

    let ingredient

    if (props.item.item) {
        ingredient = ingredientsData && props.item && ingredientsData.find(item => item._id === props.item.item)
    } else {
        ingredient = ingredientsData && props.item && ingredientsData.find(item => item._id === props.item.item)
    }

    return (
        <div className={style.wrapper}>
            <img className={style.img} src={ingredient && ingredient.image} alt={props && ingredient && ingredient.name}/>
            <p className="text text_type_main-default">{ingredient && ingredient.name}</p>
            <div className={style.wrapperPrice}>
                <p className="text text_type_digits-default"><span>{props && props.item.total}</span>   x   <span>{ingredient && ingredient.price}</span></p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}
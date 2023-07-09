import style from './ingredient-small.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";


export const IngredientSmall = (props) => {

    const ingredientsData = useSelector(state => state.ingredients.ingredients.data)

    const ingredient = ingredientsData && props.item && ingredientsData.find(item => item._id === props.item)

    return (
        <div className={style.wrapper}>
            <img className={style.img} src={ingredient && ingredient.image} alt={props && ingredient && ingredient.name}/>
            <p className="text text_type_main-default">{ingredient && ingredient.name}</p>
            <div className={style.wrapperPrice}>
                <p className="text text_type_digits-default"><span>{'1'}</span>   x   <span>{ingredient && ingredient.price}</span></p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}
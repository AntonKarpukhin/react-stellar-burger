import style from './ingredient.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";


const Ingredient = (props) => {

    const [counter, setCounter] = useState(0);

    const {item, openModal} = props

    const setIngredient = (item) => {
        openModal(item)
        setCounter(prev => +prev + 1)
    }

    return (
        <div onClick={() => setIngredient(item)} className={style.item}>
            <img src={item.image} alt={item.name}/>
            <div className={style.price}>
                <div className="text text_type_digits-default pt-1">{item.price}</div>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.paragraph} text text_type_main-default pt-1`}>{item.name}</p>
            <Counter count={counter} size="default" extraClass="m-1" />
        </div>
    )
}


export default Ingredient;
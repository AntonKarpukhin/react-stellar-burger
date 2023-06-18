import style from './ingredient.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Ingredient = (props) => {

    const { ingredients, bun } = useSelector(state => state.constructorBurger);
    const [counter, setCounter] = useState(0);
    const {item, openModal} = props
    const newItem = {...item, key: uuidv4()}

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: newItem,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    useEffect(() => {
        if (bun && (bun._id === newItem._id)) {
            setCounter(1)
        } else {
            setCounter(ingredients.filter(ingredient => ingredient._id === newItem._id).length);
        }
    },[ingredients, bun, newItem._id]);

    const setIngredient = (newItem) => {
        openModal(newItem)
    }

    return (
        <div ref={dragRef} onClick={() => setIngredient(newItem)} className={style.item}>
            <img src={newItem.image} alt={newItem.name}/>
            <div className={style.price}>
                <div className="text text_type_digits-default pt-1">{newItem.price}</div>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.paragraph} text text_type_main-default pt-1`}>{newItem.name}</p>
            {counter ? <Counter count={counter} size="default" extraClass="m-1" /> : null}
        </div>
    )
}

Ingredient.propTypes = {
    openModal: PropTypes.func,
    item: PropTypes.object
}


export default Ingredient;
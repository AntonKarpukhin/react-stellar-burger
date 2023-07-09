import style from './ingredient.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";


const Ingredient = (props) => {

    const { ingredients, bun } = useSelector(state => state.constructorBurger);
    const [counter, setCounter] = useState(0);
    const {item} = props
    const newItem = {...item, key: uuidv4()}

    const location = useLocation();
    const ingredientId = item['_id'];

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

    return (
        <Link
            key={ingredientId}
            to={`/ingredients/${ingredientId}`}
            state={{ background: location }}
        >
            <div ref={dragRef}  className={style.item}>
                <img src={newItem.image} alt={newItem.name}/>
                <div className={style.price}>
                    <div className="text text_type_digits-default pt-1">{newItem.price}</div>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${style.paragraph} text text_type_main-default pt-1`}>{newItem.name}</p>
                {counter ? <Counter count={counter} size="default" extraClass="m-1" /> : null}
            </div>
        </Link>
    )
}

Ingredient.propTypes = {
    openModal: PropTypes.func,
    item: PropTypes.object
}


export default Ingredient;
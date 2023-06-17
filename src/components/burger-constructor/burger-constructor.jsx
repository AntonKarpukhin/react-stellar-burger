import style from './burger-constructor.module.css';

import {
    Button, ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { addIngredientId, postFeed, removeOrderId } from "../../services/actions/order";
import { addIngredient, deleteIngredient } from "../../services/actions/constructorBurger";
import { useDrop } from "react-dnd";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";

const BurgerConstructor = () => {

    const bun = useSelector(state => state.constructorBurger.bun)
    const ingredients = useSelector(state => state.constructorBurger.ingredients)
    const { ingredientsID } = useSelector(state => state.order)
    const [modal, setModal] = useState(false);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(addIngredient(item))
            dispatch(addIngredientId(item))
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    })

    useEffect(() => {
        if (!bun && ingredients.length > 0) {
            setPrice(fullPrice(ingredients, {price: 0}))
        } else if (bun && ingredients.length === 0){
            setPrice(fullPrice([], bun))
        } else if (bun && ingredients.length > 0) {
            setPrice(fullPrice(ingredients, bun))
        }
    }, [ingredients, bun])

    const fullPrice = (ingredients, bun) => {
        return [...ingredients, bun].map(item => item.price ? item.price : 0).reduce((a, b) => a + b, 0)
    }

    const openModal = () => {
        dispatch(postFeed(ingredientsID));
        setModal(true);
    }

    const closeModal =() => {
        dispatch(removeOrderId());
        setModal(false);
    }

    const removeIngredient = (e, key) => {
        e.preventDefault();
        dispatch(deleteIngredient(key))
    }

    return (
        <section className={style.section}>
            <div  ref={dropTarget} className={isHover ? `${style.wrapper} ${style.wrapperActive}` : `${style.wrapper}`}>
                <div className="ml-8 mb-4">
                    {
                        bun && <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}/>
                    }
                </div>

                <div className={`${style.wrapperIngredients } custom-scroll`}>
                    {
                        ingredients.map((item, index) => <IngredientConstructor key={item.key} item={item} removeIngredient={removeIngredient} index={index}/>)
                    }
                </div>
                <div className="ml-8 mt-4">
                    {
                        bun && <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}/>
                    }
                </div>
            </div>
            <div className={`${style.fullPrice} mr-8`}>
                <div className={style.wrapperFullPrice}>
                    <p className="text text_type_digits-medium">{price ? price : 0}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={openModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {modal && <Modal closeModal={closeModal}><OrderDetails /></Modal>}
        </section>
    )
}

export default BurgerConstructor;
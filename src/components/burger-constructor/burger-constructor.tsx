import style from './burger-constructor.module.css';

import {
    Button, ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {  useMemo, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { addIngredientId, postFeed, removeOrderId } from "../../services/actions/orderAction";
import { addIngredient, deleteIngredient } from "../../services/actions/constructorBurgerAction";
import { useDrop } from "react-dnd";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { IIngredientInterface } from "../../services/types/ingredient-types";

const BurgerConstructor: FC = () => {

    const bun = useSelector(state => state.constructorBurger.bun)

    const ingredients = useSelector(state => state.constructorBurger.ingredients)
    const { ingredientsID } = useSelector(state => state.order)
    const user = useSelector(state => state.userReducer);
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: IIngredientInterface) {
            dispatch(addIngredient(item))
            dispatch(addIngredientId(item))
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    })

    const fullPrice = useMemo(() => {
        if (!bun && ingredients && ingredients.length > 0) {
            return [...ingredients, {price: 0}].map(item => item.price).reduce((a, b) => a + b, 0)
        } else if (bun && ingredients.length === 0){
            return bun.price * 2
        } else if (bun && ingredients.length > 0) {
            const newBun = {...bun, price: bun.price * 2}
            return [...ingredients, newBun].map(item => item.price).reduce((a, b) => a + b, 0)
        }
    }, [ingredients, bun])

    const openModal = () => {
        if (!user.isAuthenticated) navigate('/login')
        dispatch(postFeed(ingredientsID));
        setModal(true);
    }

    const closeModal =() => {
        dispatch(removeOrderId());
        setModal(false);
    }

    const removeIngredient = (e: Event, key: string) => {
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
                        ingredients.map((item: IIngredientInterface, index: number) => <IngredientConstructor key={item.key} item={item} removeIngredient={removeIngredient} index={index}/>)
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
                    <p className="text text_type_digits-medium">{fullPrice ? fullPrice : 0}</p>
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
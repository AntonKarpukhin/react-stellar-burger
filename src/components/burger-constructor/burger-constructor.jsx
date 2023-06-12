import style from './burger-constructor.module.css';

import {
    Button, ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../services/burger-constructor-context";


const BurgerConstructor = () => {

    const [modal, setModal] = useState(false);
    const [dataContext, setDataContext] = useContext(BurgerContext);
    const [price, setPrice] = useState();

    const openModal = () => {

        const data = dataContext.ingredients.map(item => {
            return item._id
        })
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: data
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
            .then(res => {
                setPrice(res.order.number)
                setModal(true);
            })
            .catch(err => console.log(err))
    }

    const closeModal =() => {
        setModal(false);
    }

    const [...data] = dataContext.ingredients;
    const bun = data.find(item => item.type === 'bun')
    const ingredients = data.filter(item => item.type !== 'bun')

    return (
        <section className={style.section}>
            <div className={`${style.wrapper}`}>
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
                        ingredients.map(item =>  {
                        return (
                            <div className={`${style.item} mb-4`} key={item._id} >
                                <DragIcon type="primary" />
                                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image}/>
                            </div>
                        )})
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
                    <p className="text text_type_digits-medium">{dataContext.count.counter ? dataContext.count.counter : 0}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={openModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {modal && <Modal closeModal={closeModal}><OrderDetails price={price}/></Modal>}
        </section>
    )
}

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(ingredientPropType)
// }

export default BurgerConstructor;
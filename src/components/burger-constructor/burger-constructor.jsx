import style from './burger-constructor.module.css';

import {
    Button, ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";


const BurgerConstructor = (props) => {

    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

    const closeModal =() => {
        setModal(false);
    }

    const [...data] = props.data;
    const bun = data.find(item => item.type === 'bun')
    const ingredients = data.filter(item => item.type !== 'bun');

    return (
        <section className={style.section}>
            <div className={`${style.wrapper}`}>
                <div className="ml-8 mb-4">
                    {
                        bun && <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={200}
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
                            price={200}
                            thumbnail={bun.image}/>
                    }
                </div>
            </div>
            <div className={`${style.fullPrice} mr-8`}>
                <div className={style.wrapperFullPrice}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={openModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {modal && <Modal closeModal={closeModal}><OrderDetails/></Modal>}
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor;
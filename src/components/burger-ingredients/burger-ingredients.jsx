import style from './burger-ingredients.module.css';

import { useState } from "react";
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = (props) => {

    const [current, setCurrent] = useState('one');
    const [modal, setModal] = useState(false);
    const [cardModal, setCardModal] = useState({})

    const openModal = (item) => {
        setCardModal(item);
        setModal(modal => !modal);
    }

    const changeCurrent = (e) => {
        setCurrent(() =>  e);
    }

    const createElement = (item) => {
        return (
            <div onClick={() => openModal(item)}  key={item._id} className={style.item}>
                <img src={item.image} alt={item.name}/>
                <div className={style.price}>
                    <div className="text text_type_digits-default pt-1">{item.price}</div>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${style.paragraph} text text_type_main-default pt-1`}>{item.name}</p>
                <Counter count={1} size="default" extraClass="m-1" />
            </div>
        )
    }

    const [...data] = props.data;
    const bun = data.filter(item => item.type === 'bun');
    const main = data.filter(item => item.type === 'main');
    const sauce = data.filter(item => item.type === 'sauce');

    return (
        <section className={style.section}>
            <div>
                <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
                <nav className={`${style.navigation} pt-5`}>
                    <Tab value="one" active={current === 'one'} onClick={changeCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={changeCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={changeCurrent}>
                        Начинки
                    </Tab>
                </nav>
            </div>
            <div className={`${style.wrapper} custom-scroll`}>
                <div className="pt-10" >
                    <p className="text text_type_main-medium">Булки</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {bun.map(item => createElement(item)) }
                    </div>
                </div>
                <div className="pt-10" >
                    <p className="text text_type_main-medium">Соусы</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {main.map(item => createElement(item))}
                    </div>
                </div>
                <div className="pt-10" >
                    <p className="text text_type_main-medium">Начинки</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {sauce.map(item => createElement(item))}
                    </div>
                </div>
            </div>
            {modal && <Modal openModal={openModal}><IngredientDetails card={cardModal}/></Modal>}
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerIngredients;
import style from './burger-ingredients.module.css';

import { useContext, useEffect, useReducer, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { BurgerContext } from "../../services/burger-constructor-context";
import Ingredient from "../ingredient/ingredient";

function reducer(state, action) {
    switch (action.type) {
        case "add":
            return { counter: state.counter + action.payload };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

const BurgerIngredients = () => {

    const [current, setCurrent] = useState('one');
    const [modal, setModal] = useState(false);
    const [cardModal, setCardModal] = useState({})

    const [dataContext, setDataContext] = useContext(BurgerContext);
    const [counter, dispatch] = useReducer(reducer, {counter: dataContext.count});

    useEffect(() => {
        setDataContext(prevState => {
            return {...prevState, count: counter}
        });
    }, [dataContext.ingredients])

    const openModal = (item) => {
        setCardModal(item);
        // setModal(true);
        dispatch({type: 'add', payload: +item.price})
        setDataContext(prevState => {
            const oldState = {...prevState, ingredients: [...prevState.ingredients, item]}
            const newState = oldState.ingredients.reduce((acc, burg) => {
                if (acc.includes(burg)) {
                    return acc;
                }
                return [...acc, burg];
            }, []);
            return {...prevState, ingredients: newState}
        })
    }

    const closeModal = () => {
        setModal(false);
    }

    const changeCurrent = (e) => {
        setCurrent(() =>  e);
    }

    const [...data] = dataContext.initial;
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
                        {bun.map(item => <Ingredient key={item._id} openModal={() => openModal(item)} item={item}/>) }
                    </div>
                </div>
                <div className="pt-10" >
                    <p className="text text_type_main-medium">Соусы</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {main.map(item => <Ingredient key={item._id} openModal={() => openModal(item)} item={item}/>)}
                    </div>
                </div>
                <div className="pt-10" >
                    <p className="text text_type_main-medium">Начинки</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {sauce.map(item => <Ingredient key={item._id} openModal={() => openModal(item)} item={item}/>)}
                    </div>
                </div>
            </div>
            {modal && <Modal closeModal={closeModal}><IngredientDetails card={cardModal}/></Modal>}
        </section>
    )
}

// BurgerIngredients.propTypes = {
//     data: PropTypes.arrayOf(ingredientPropType)
// }

export default BurgerIngredients;
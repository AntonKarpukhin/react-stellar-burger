import style from './burgerIngredients.module.css';

import {Component} from "react";
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";


export default class BurgerIngredients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'one'
        }
    }

    setCurrent = (e) => {
        this.setState(({current: e}))
    }

    createElement = (item) => {
        return (
            <div key={item._id} className={style.item}>
                <img src={item.image} alt={item.name}/>
                <div className={style.price}>
                    <div className="text text_type_digits-default pt-1">{item.price}</div>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default pt-1" style={{textAlign: "center"}}>{item.name}</p>
                <Counter count={1} size="default" extraClass="m-1" />
            </div>
        )
    }

    render() {
        const [...data] = this.props.data;
        const bun = data.filter(item => item.type === 'bun');
        const main = data.filter(item => item.type === 'main');
        const sauce = data.filter(item => item.type === 'sauce');

        return (
            <section className={style.section}>
                <div>
                    <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
                    <nav className='pt-5' style={{ display: 'flex' }}>
                        <Tab value="one" active={this.state.current === 'one'} onClick={this.setCurrent}>
                            Булки
                        </Tab>
                        <Tab value="two" active={this.state.current === 'two'} onClick={this.setCurrent}>
                            Соусы
                        </Tab>
                        <Tab value="three" active={this.state.current === 'three'} onClick={this.setCurrent}>
                            Начинки
                        </Tab>
                    </nav>
                </div>
                <div style={{overflow: 'scroll', height: '756px', overflowX: 'hidden'}} className='custom-scroll'>
                    <div className="pt-10" >
                        <p className="text text_type_main-medium">Булки</p>
                        <div className={`${style.wrapperItem} pt-6 pl-4`}>
                            {bun.map(item => this.createElement(item))}
                        </div>
                    </div>
                    <div className="pt-10" >
                        <p className="text text_type_main-medium">Соусы</p>
                        <div className={`${style.wrapperItem} pt-6 pl-4`}>
                            {main.map(item => this.createElement(item))}
                        </div>
                    </div>
                    <div className="pt-10" >
                        <p className="text text_type_main-medium">Начинки</p>
                        <div className={`${style.wrapperItem} pt-6 pl-4`}>
                            {sauce.map(item => this.createElement(item))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
}
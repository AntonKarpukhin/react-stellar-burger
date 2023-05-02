import style from './burgerConstructor.module.css';

import {Component} from "react";
import { Button, CurrencyIcon, DeleteIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";


export default class BurgerConstructor extends Component {
    constructor(props) {
        super(props);
    }

    createElement = (item) => {
        return (
            <div key={item._id} className={style.wrapperItem}>
                <div className={style.wrapperIcon}>
                    {item.type === 'sauce' ? <DragIcon type="primary" /> : null}
                </div>
                <div className={style.wrapperElement}>
                    <img className={style.img} src={item.image} alt={item.name}/>
                    <p className={`${style.name} text text_type_main-default`}>{item.name}</p>
                    <div className={style.price}>
                        <div className="text text_type_digits-default pt-1">{item.price}</div>
                        <CurrencyIcon type="primary" />
                    </div>
                    <DeleteIcon className='ml-5' type="primary" />
                </div>
            </div>
        )
    }

    render() {
        const [...data] = this.props.data;
        return (
            <section className={style.section}>
                <div style={{overflow: 'scroll', height: '756px', overflowX: 'hidden'}} className="custom-scroll">
                    {data.map(item => this.createElement(item))}
                </div>
                <div className={style.fullPrice}>
                    <div className={style.wrapperFullPrice}>
                        <p className="text text_type_main-large">610</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </section>
        )
    }
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
}
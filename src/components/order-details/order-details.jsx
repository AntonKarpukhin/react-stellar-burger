import style from './order-details.module.css';

import iconDone from '../../images/done.jpg'
import { useState } from "react";

const OrderDetails = () => {

    const [current, setCurrent] = useState('034536')

    return (
        <div className={style.wrapper}>
            <p className='text text_type_digits-large'>{current}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <div className='mt-15'>
                <img src={iconDone} alt="иконка подтверждения"/>
            </div>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className={`${style.paragraph} text text_type_main-default mt-2`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}


export default OrderDetails;
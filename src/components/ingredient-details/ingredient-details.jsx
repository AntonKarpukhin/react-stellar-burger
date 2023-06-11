import style from './ingredient-details.module.css';

import { Fragment } from "react";
import { ingredientPropType } from "../../utils/prop-types";


const IngredientDetails = ( { card }) => {

    return (
            <Fragment>
                <h2 className="text text_type_main-large mt-15 ml-10">Детали ингредиента</h2>
                <div className={style.wrapper}>
                    <img className={style.img} src={card && card.image} alt={card && card.name}/>
                    <p className="text text_type_main-medium mt-4">{card && card.name}</p>
                    <div className={style.wrapperIndicators}>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Калории,ккал</p>
                            <p className="text text_type_digits-default">{card && card.calories}</p>
                        </div>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Белки, г</p>
                            <p className="text text_type_digits-default">{card && card.proteins}</p>
                        </div>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Жиры, г</p>
                            <p className="text text_type_digits-default">{card && card.fat}</p>
                        </div>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Углеводы, г</p>
                            <p className="text text_type_digits-default">{card && card.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

IngredientDetails.propTypes = {
    data: ingredientPropType
}

export default IngredientDetails
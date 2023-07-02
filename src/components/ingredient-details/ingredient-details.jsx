import style from './ingredient-details.module.css';

import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const IngredientDetails = () => {

    const data = useSelector(state => state.ingredient.ingredientData)

    return (
            <Fragment>
                <h2 className="text text_type_main-large mt-15 ml-10">Детали ингредиента</h2>
                <div className={style.wrapper}>
                    <img className={style.img} src={data && data.image} alt={data && data.name}/>
                    <p className="text text_type_main-medium mt-4">{data && data.name}</p>
                    <div className={style.wrapperIndicators}>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Калории,ккал</p>
                            <p className="text text_type_digits-default">{data && data.calories}</p>
                        </div>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Белки, г</p>
                            <p className="text text_type_digits-default">{data && data.proteins}</p>
                        </div>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Жиры, г</p>
                            <p className="text text_type_digits-default">{data && data.fat}</p>
                        </div>
                        <div className={style.wrapperIndicator}>
                            <p className="text text_type_main-small">Углеводы, г</p>
                            <p className="text text_type_digits-default">{data && data.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default IngredientDetails
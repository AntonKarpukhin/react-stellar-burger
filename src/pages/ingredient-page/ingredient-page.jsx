import style from './ingredient-page.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getFeed } from "../../services/actions/ingredientsAction";

export const IngredientPage = () => {

    const ingredients = useSelector(state => state.ingredients.ingredients.data)
    const location = useLocation()
    const { feedRequest, feedFailed } = useSelector(state => state.ingredients)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeed())
    }, [])

    if (feedRequest) {
        return  <h4>Загрузка компонентов</h4>
    } else if (feedFailed) {
        return <h5>Ошибка загрузки</h5>
    }

    const ingredientId = location.pathname.slice(13)
    const data = ingredients.find(item => item._id === ingredientId)

    return (
        <section className={style.ingredientPage}>
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
        </section>
    )
}
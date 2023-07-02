import style from './layout-main.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export const LayoutMain = (props) => {
    const {openModal} = props
    return (
        <main className={style.main}>
            <BurgerIngredients openModal={openModal} />
            <BurgerConstructor />
        </main>
    )
}
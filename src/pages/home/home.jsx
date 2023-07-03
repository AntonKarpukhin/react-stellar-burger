import style from './home.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export const Home = () => {

    return (
        <main className={style.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}
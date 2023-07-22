import style from './home.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { FC } from "react";

export const Home: FC = () => {

    return (
        <main className={style.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}
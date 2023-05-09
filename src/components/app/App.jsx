import style from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";

function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => res.json())
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

  return (
    <div className={style.app}>
        <AppHeader/>
        <main className={style.main}>
            <BurgerIngredients data={data}/>
            <BurgerConstructor data={data}/>
        </main>
    </div>

  );
}

export default App;

import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {  Provider } from "../../services/burger-constructor-context";
import { useEffect, useState } from "react";

function App() {

    const [data, setData] = useState({initial: [], ingredients: [], count: 0});

    useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => setData(prevState => ({...prevState, initial: res.data})))
            .catch(err => console.log(err))
    }, [])


  return (
    <Provider value={[data, setData]}>
        <div className={style.app}>
            <AppHeader/>
            <main className={style.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    </Provider>

  );
}

export default App;

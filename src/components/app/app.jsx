import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";

function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
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

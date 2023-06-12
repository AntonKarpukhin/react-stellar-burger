import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {  Provider } from "../../services/burger-constructor-context";
import { useEffect, useMemo, useState } from "react";
import { checkResponse, initialData } from "../../utils/burger-api";

function App() {

    const [data, setData] = useState({initial: [], ingredients: [], count: 0});

    const contextValue = useMemo(() => {
        return [data, setData];
    }, [data, setData]);

    useEffect(() => {
       initialData()
            .then(checkResponse)
            .then(res => setData(prevState => ({...prevState, initial: res.data})))
            .catch(err => console.log(err))
    }, [])


  return (
    <Provider value={contextValue}>
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

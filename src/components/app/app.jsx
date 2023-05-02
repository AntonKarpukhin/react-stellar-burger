import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <div className={styles.app}>
        <AppHeader/>
        <main style={{margin: "0 auto", display: 'flex', gap: '40px'}}>
            <BurgerIngredients data={data}/>
            <BurgerConstructor data={data}/>
        </main>
    </div>
  );
}

export default App;

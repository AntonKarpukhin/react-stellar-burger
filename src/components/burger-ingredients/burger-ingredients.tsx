import style from './burger-ingredients.module.css';
import { FC, RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { useSelector, useDispatch } from '../../services/types/hooks';
import { getFeed } from "../../services/actions/ingredientsAction";

const BurgerIngredients: FC = () => {

    const ingredients = useSelector(state => state.ingredients.ingredients)
    const { feedRequest, feedFailed } = useSelector(state => state.ingredients)

    const dispatch = useDispatch();


    const [current, setCurrent] = useState('one');

    const refBun = useRef<HTMLDivElement>(null);
    const refSauce = useRef<HTMLDivElement>(null);
    const refMain = useRef<HTMLDivElement>(null);


    useEffect(() => {
        dispatch(getFeed())
    }, [])

    const checkScroll = () => {

        let topBun;
        let topMain;
        let topSauce;

        if (refBun.current && refSauce.current && refMain.current ) {
            topBun = refBun.current.getBoundingClientRect();
            topMain = refMain.current.getBoundingClientRect();
            topSauce = refSauce.current.getBoundingClientRect();
        }

        if (topBun && topBun.top >= 236 && topMain && topMain.top > 414 && topSauce && topSauce.top > 600) {
            setCurrent("one");
        } else if (topBun && topBun.top < 236 && topMain && topMain.top < 316 && topSauce && topSauce.top > 600) {
            setCurrent("two");
        } else if (topBun && topBun.top < 236 && topMain && topMain.top < -600 && topSauce && topSauce.top < 600) {
            setCurrent("three");
        }
    };

    const changeCurrentAndScroll = (e: string, ref: RefObject<HTMLDivElement>) => {
        setCurrent(() =>  e);
        if (ref.current) ref.current.scrollIntoView()
    }

    const { bun, main, sauce } = useMemo(() => {
        if (!ingredients?.length) {
            return { bun: [], main: [], sauce: [] };
        }

        return {
            bun: ingredients.filter((item) => item.type === "bun"),
            main: ingredients.filter((item) => item.type === "main"),
            sauce: ingredients.filter((item) => item.type === "sauce"),
        };
    }, [ingredients]);

    if (feedRequest) {
        return  <h4>Загрузка компонентов</h4>
    } else if (feedFailed) {
        return <h5>Ошибка загрузки</h5>
    }

    return (
        <section className={style.section}>
            <div >
                <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
                <nav className={`${style.navigation} pt-5`}>
                    <Tab value="one" active={current === 'one'} onClick={(e) => changeCurrentAndScroll(e, refBun)}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={(e) => changeCurrentAndScroll(e, refMain)}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={(e) => changeCurrentAndScroll(e, refSauce)}>
                        Начинки
                    </Tab>
                </nav>
            </div>
            <div onScroll={checkScroll} id='scroll' className={`${style.wrapper} custom-scroll`}>
                <div ref={refBun}   className="pt-10" >
                    <p className="text text_type_main-medium">Булки</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {bun.map(item =>  <Ingredient key={item._id} item={item}/>) }
                    </div>
                </div>
                <div ref={refMain} className="pt-10" >
                    <p className="text text_type_main-medium">Соусы</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {main.map(item =>  <Ingredient  key={item._id} item={item}/>)}
                    </div>
                </div>
                <div ref={refSauce}  className="pt-10" >
                    <p className="text text_type_main-medium">Начинки</p>
                    <div className={`${style.wrapperItem} pt-6 pl-4`}>
                        {sauce.map(item =>  <Ingredient key={item._id} item={item}/>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BurgerIngredients;
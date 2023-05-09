import style from './appHeader.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <header className={style.header}>
            <nav className={style.header__navigation}>
                <div className={style.header__container}>
                    <BurgerIcon type="primary"/>
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </div>
                <div className={`${style.header__container} ml-2`}>
                    <ListIcon type="secondary"/>
                    <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                </div>
            </nav>
            <Logo/>
            <div className={style.header__container}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
            </div>
        </header>
    )
}

export default AppHeader;
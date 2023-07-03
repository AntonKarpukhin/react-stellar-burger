import style from './app-header.module.css';
import {  NavLink } from 'react-router-dom';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const AppHeader = () => {

    const isAuthChecked = useSelector(state => state.userReducer.isAuthenticated);

    const checkUser = () => {
        if (isAuthChecked) {
            return '/profile'
        }
        return '/login'
    }

    return (
        <header className={style.header}>
            <nav className={style.header__navigation}>
                <div className={style.header__container}>
                    <BurgerIcon type="primary"/>
                    <NavLink to='/' className={({ isActive }) => isActive ? `${style.linkActive} text text_type_main-default ml-2` : `${style.link} text text_type_main-default ml-2` } >Конструктор
                    </NavLink>
                </div>
                <div className={`${style.header__container} ml-2`}>
                    <ListIcon type="secondary"/>
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </div>
            </nav>
            <Logo/>
            <NavLink to={checkUser()} className={({ isActive }) => isActive ? `${style.header__container} ${style.linkActive} text text_type_main-default ml-2` : `${style.header__container} ${style.link} text text_type_main-default ml-2` } >
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </NavLink>
        </header>
    )
}

export default AppHeader;
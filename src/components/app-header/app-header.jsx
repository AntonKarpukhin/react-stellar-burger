import style from './app-header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { routeLogin, routeMain, routeOrderFeed, routeProfile, routeUser } from "../../utils/data";

const AppHeader = () => {

    const isAuthChecked = useSelector(state => state.userReducer.isAuthenticated);

    const checkUser = () => {
        if (isAuthChecked) {
            return `${routeUser}/${routeProfile}`
        }
        return routeLogin
    }

    const clazz = ({ isActive }) => isActive ? `${style.linkActive} text text_type_main-default ml-2` : `${style.link} text text_type_main-default ml-2`;

    return (
        <header className={style.header}>
            <nav className={style.header__navigation}>
                <div className={style.header__container}>
                    <BurgerIcon type="primary"/>
                    <NavLink to={routeMain} className={clazz} >Конструктор
                    </NavLink>
                </div>
                <div className={`${style.header__container} ml-2`}>
                    <ListIcon type="secondary"/>
                    <NavLink to={routeOrderFeed} className={({ isActive }) => isActive ? `${style.linkActive} text text_type_main-default ml-2` : `${style.link} text text_type_main-default ml-2` }>Лента заказов</NavLink>
                </div>
            </nav>
            <Link to={routeMain}>
                <Logo/>
            </Link>
            <NavLink to={checkUser()} className={({ isActive }) => isActive ? `${style.header__container} ${style.linkActive} text text_type_main-default ml-2` : `${style.header__container} ${style.link} text text_type_main-default ml-2` } >
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </NavLink>
        </header>
    )
}

export default AppHeader;
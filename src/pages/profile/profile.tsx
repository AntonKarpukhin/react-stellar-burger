import style from './profile.module.css';
import { NavLink, Outlet  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogOutUser } from "../../services/actions/userAction";
import { routeProfile, routeProfileFeed} from "../../utils/data";

export const Profile = () => {

    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(postLogOutUser(localStorage.getItem("refreshToken")))
    }

    const clazz = ({ isActive } : { isActive: boolean })  => (isActive ? `${style.li} ${style.liActive}` : `${style.li}`);

    return (
        <section className={style.profile}>
            <div className={style.wrapper}>
                <div>
                    <nav className={style.nav}>
                        <NavLink to={routeProfile} className={clazz}>
                            <p className="text text_type_main-medium">
                                Профиль
                            </p>
                        </NavLink>
                        <li className={style.li}>
                            <NavLink to={routeProfileFeed} className={clazz}>
                                <p className="text text_type_main-medium">
                                    История заказов
                                </p>
                            </NavLink>
                        </li>
                        <li className={style.li}>
                            <p onClick={onLogOut} className={`${style.button} text text_type_main-medium`}>
                                Выход
                            </p>
                        </li>
                    </nav>
                    <p className={`${style.paragraph} "text text_type_main-small"`}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </p>
                </div>
                <Outlet />
            </div>
        </section>
    )
}
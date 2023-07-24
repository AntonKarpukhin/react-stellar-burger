import style from './entrance.module.css';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { getLoginData } from "../../services/actions/userAction";
import { useForm } from "../../hooks/useForm";
import { routeForgotPassword, routeMain, routeRegister } from "../../utils/data";
import { FormEvent } from "react";

export const Entrance = () => {

    const {values, handleChange} = useForm({email: '', password: ''});

    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onEntrance = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getLoginData( values))
        if (user.isAuthenticated) navigate(routeMain);
    }

    return (
        <section className={style.entrance}>
            <form  onSubmit={onEntrance} className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Вход
                </p>
                <EmailInput
                    onChange={handleChange}
                    value={values.email!}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password!}
                    name={'password'}
                    extraClass="mb-2"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={style.wrapperDescription}>
                <p className="text text_type_main-default">
                    Вы — новый пользователь? <Link to={routeRegister} className={style.span}>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default">
                    Забыли пароль? <Link to={routeForgotPassword} className={style.span}>Восстановить пароль</Link>
                </p>
            </div>
        </section>
    )
}
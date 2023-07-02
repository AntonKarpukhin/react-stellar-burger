import style from './entrance.module.css';
import { useEffect, useState } from "react";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registrationUserData } from "../../services/actions/userAction";

export const Entrance = () => {

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAuthenticated) navigate('/profile')
    }, [user.isAuthenticated])

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const onEntrance = () => {
        const data = {
            email: emailValue,
            password: passwordValue
        }
        dispatch(registrationUserData(data))
        if (user.isAuthenticated) navigate('/');
    }

    return (
        <section className={style.entrance}>
            <div className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Вход
                </p>
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                />
                <Button onClick={onEntrance} htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </div>
            <div className={style.wrapperDescription}>
                <p className="text text_type_main-default">
                    Вы — новый пользователь? <Link to="/register" className={style.span}>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default">
                    Забыли пароль? <Link to="/forgot-password" className={style.span}>Восстановить пароль</Link>
                </p>
            </div>
        </section>
    )
}
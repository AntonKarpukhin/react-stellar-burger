import style from './forgot-password.module.css'
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkResponse, resetPassword } from "../../utils/burger-api";
import { useSelector } from "react-redux";

export const ForgotPassword = () => {

    const [emailValue, setEmailValue] = useState('')

    const user = useSelector(state => state.userReducer);

    const navigate = useNavigate();
    const location = useLocation()

    localStorage.setItem('path', location.pathname)

    useEffect(() => {
        if (user.isAuthenticated) navigate('/')
    },[])

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const resPassword = () => {

        if (!emailValue) return

        resetPassword(emailValue)
            .then(res => checkResponse(res))
            .then(res => navigate('/reset-password'))
    }

    return (
        <section className={style.forgot}>
            <div className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}
                    name={'email'}
                    isIcon={false}
                    placeholder='Укажите e-mail'
                />
                <Button onClick={resPassword} htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
            <div className={style.wrapperDescription}>
                <p className="text text_type_main-default">
                    Вспомнили пароль? <Link to="/login" className={style.span}>Войти</Link>
                </p>
            </div>
        </section>
    )
}
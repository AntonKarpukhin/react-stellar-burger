import style from './forgot-password.module.css'
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkResponse, resetPassword } from "../../utils/burger-api";
import { useForm } from "../../hooks/useForm";
import { routeLogin, routeResetPassword } from "../../utils/data";

export const ForgotPassword = () => {

    const {values, handleChange} = useForm({email: ''});

    const navigate = useNavigate();
    const location = useLocation()

    localStorage.setItem('path', location.pathname)

    const resPassword = (e) => {
        e.preventDefault();
        if (!values) return
        resetPassword(values)
            .then(res => checkResponse(res))
            .then(res => navigate(routeResetPassword))
    }

    return (
        <section className={style.forgot}>
            <form onSubmit={resPassword} className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                    placeholder='Укажите e-mail'
                />
                <Button  htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={style.wrapperDescription}>
                <p className="text text_type_main-default">
                    Вспомнили пароль? <Link to={routeLogin} className={style.span}>Войти</Link>
                </p>
            </div>
        </section>
    )
}
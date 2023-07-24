import style from './reset-password.module.css';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkResponse, saveNewPassword } from "../../utils/burger-api";
import { useSelector } from '../../services/types/hooks';
import { useForm } from "../../hooks/useForm";
import { routeLogin, routeMain } from "../../utils/data";


export const ResetPassword: FC = () => {

    const {values, handleChange} = useForm({password: '', token: ''});

    const user = useSelector(state => state.userReducer);

    const navigate = useNavigate();
    const location = localStorage.getItem('path')

    useEffect(() => {
        if (user.isAuthenticated) navigate(routeMain)
        if (location) {
            localStorage.removeItem('path')
        } else {
            navigate(routeMain)
        }
    },[])

    const postNewPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!values.password || !values.token) return

        saveNewPassword(values)
            .then(res => checkResponse(res))
            .then(res => navigate(routeLogin))
    }

    return (
        <section className={style.reset}>
            <form onSubmit={postNewPassword} className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <PasswordInput
                    onChange={handleChange}
                    value={values.password!}
                    name={'password'}
                    extraClass="mb-2"
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.token!}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
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
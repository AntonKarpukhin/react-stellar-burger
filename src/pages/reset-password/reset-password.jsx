import style from './reset-password.module.css';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkResponse, saveNewPassword } from "../../utils/burger-api";
import { useSelector } from "react-redux";


export const ResetPassword = () => {

    const [passwordValue, setPasswordValue] = useState('')
    const [nameValue, setNameValue] = useState('')

    const user = useSelector(state => state.userReducer);

    const navigate = useNavigate();
    const location = localStorage.getItem('path')

    useEffect(() => {
        if (user.isAuthenticated) navigate('/')
        if (location) {
            localStorage.removeItem('path')
        } else {
            navigate('/')
        }
    },[])


    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const postNewPassword = () => {

        if (!passwordValue) return

        saveNewPassword(passwordValue)
            .then(res => checkResponse(res))
            .then(res => navigate('/login'))
    }

    return (
        <section className={style.reset}>
            <div className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <PasswordInput
                    onChange={onChangePassword}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setNameValue(e.target.value)}
                    value={nameValue}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Button onClick={postNewPassword} htmlType="submit" type="primary" size="medium">
                    Сохранить
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
import style from './registration.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkResponse, postRegistration } from "../../utils/burger-api";

export const Registration = () => {

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [nameValue, setNameValue] = useState('')

    const navigate = useNavigate();

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const onClickRegistration = () => {
        const data = {
            email: emailValue,
            password: passwordValue,
            name: nameValue
        }

        if (!emailValue || !passwordValue || !nameValue) return

        postRegistration(data)
            .then(res => checkResponse(res))
            .then(res => navigate('/login'))
    }

    return (
        <section className={style.registration}>
            <div className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    value={nameValue}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
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
                <Button onClick={onClickRegistration} htmlType="submit" type="primary" size="medium">
                    Зарегестрироваться
                </Button>
            </div>
            <div className={style.wrapperDescription}>
                <p className="text text_type_main-default">
                    Уже зарегестрированы? <Link to="/login" className={style.span}>Войти</Link>
                </p>
            </div>
        </section>
    )
}


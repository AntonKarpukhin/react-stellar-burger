import style from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUserData, postLogOutUser } from "../../services/actions/userAction";

export const Profile = () => {

    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const user = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.isAuthenticated) {
            setEmailValue(user.login);
            setNameValue(user.name);
        }
    },[user.isAuthenticated])


    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const onLogOut = () => {
        dispatch(postLogOutUser(localStorage.getItem("refreshToken")))
    }

    const onCancel = () => {
        setNameValue(user.name);
        setEmailValue(user.login);
        setPasswordValue('');
    }

    const changeUser = () => {
        const data = {
            email: emailValue,
            name: nameValue
        }
        dispatch(changeUserData('PATCH', data))
    }

    return (
        <section className={style.profile}>
            <div className={style.wrapper}>
                <div>
                    <nav className={style.nav}>
                        <NavLink to='/profile' className={(navData) => (navData.isActive ? `${style.li} ${style.liActive}` : `${style.li}`)}>
                            <p className="text text_type_main-medium">
                                Профиль
                            </p>
                        </NavLink>
                        <li className={style.li}>
                            <p className="text text_type_main-medium">
                                История заказов
                            </p>
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
                <div className={style.wrapperInput}>
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
                        icon={"EditIcon"}
                    />
                    <EmailInput
                        onChange={onChangeEmail}
                        value={emailValue}
                        name={'email'}
                        isIcon={false}
                        icon={"EditIcon"}
                        placeholder={'Логин'}
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={passwordValue}
                        name={'password'}
                        extraClass="mb-2"
                        placeholder={'Пароль'}
                    />
                    <div className={style.wrapperButton}>
                        <Button onClick={changeUser} htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                        <Button onClick={onCancel} htmlType="submit" type="primary" size="medium">
                            Отменить
                        </Button>
                    </div>
                </div>
            </div>


        </section>
    )
}
import style from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUserData, postLogOutUser } from "../../services/actions/userAction";
import { useForm } from "../../hooks/useForm";

export const Profile = () => {

    const user = useSelector(state => state.userReducer);
    const {values, handleChange, setValues} = useForm({name: user.name, email: user.login, password: ''});

    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(postLogOutUser(localStorage.getItem("refreshToken")))
    }

    const onCancel = () => {
        setValues(value => ({ ...value, name: user.name, email: user.login, password: '' }))
    }

    const changeUser = (e) => {
        e.preventDefault();
        dispatch(changeUserData('PATCH', values))
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
                <form onSubmit={changeUser} className={style.wrapperInput}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                        icon={"EditIcon"}
                    />
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        isIcon={false}
                        icon={"EditIcon"}
                        placeholder={'Логин'}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        extraClass="mb-2"
                        placeholder={'Пароль'}
                    />
                    <div className={style.wrapperButton}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                        <Button onClick={onCancel} htmlType="reset" type="primary" size="medium">
                            Отменить
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}
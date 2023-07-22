import style from './registration.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { checkResponse, postRegistration } from "../../utils/burger-api";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../../services/actions/userAction";
import { routeLogin, routeUser} from "../../utils/data";
import { FC, FormEvent } from "react";

export const Registration: FC = () => {

    const {values, handleChange} = useForm({name: '', email: '', password: ''});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickRegistration = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!values.name || !values.email || !values.password) return

        postRegistration(values)
            .then(res => checkResponse(res))
            .then(res => {
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                dispatch(checkUserAuth())
                navigate(routeUser)
            })
            .catch(err => console.log(err))
    }

    return (
        <section className={style.registration}>
            <form onSubmit={onClickRegistration} className={style.wrapper}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name!}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
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
                    Зарегестрироваться
                </Button>
            </form>
            <div className={style.wrapperDescription}>
                <p className="text text_type_main-default">
                    Уже зарегестрированы? <Link to={routeLogin} className={style.span}>Войти</Link>
                </p>
            </div>
        </section>
    )
}
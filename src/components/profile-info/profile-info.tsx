import style from './profile-info.module.css';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector} from '../../services/types/hooks';
import { changeUserData } from "../../services/actions/userAction";
import { IUseFormTypes } from "../../hooks/useForm-types";
import { FC, FormEvent } from "react";



export const ProfileInfo: FC = () => {

    const user = useSelector(state => state.userReducer);
    const {values, handleChange, setValues} = useForm({name: user.name, email: user.login, password: ''});

    const dispatch = useDispatch();

    const onCancel = () => {
        setValues((value: IUseFormTypes) => ({ ...value, name: user.name, email: user.login, password: '' }))
    }

    const changeUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(changeUserData('PATCH', values))
    }

    return (
        <section>
            <form onSubmit={changeUser} className={style.wrapperInput}>
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
                    icon={"EditIcon"}
                />
                <Input
                    onChange={handleChange}
                    value={values.email!}
                    name={'email'}
                    icon={"EditIcon"}
                    placeholder={'Логин'}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password!}
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
        </section>
    )
}
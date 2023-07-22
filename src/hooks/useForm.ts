import { ChangeEvent, useState } from "react";
import { IUseFormTypes } from "./useForm-types";

export function useForm(inputValues: IUseFormTypes) {
    const [values, setValues] = useState<IUseFormTypes>(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}
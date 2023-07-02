import { useState, useCallback } from "react";
import { openIngredient, removeIngredient } from "../services/actions/ingredientAction";
import { useDispatch } from "react-redux";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
    const openModal = useCallback((item) => {
        setIsModalOpen(true);
        dispatch(openIngredient(item))
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        dispatch(removeIngredient())
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal,
    };
};
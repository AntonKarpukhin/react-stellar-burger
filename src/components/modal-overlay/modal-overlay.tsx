import style from './modal-overlay.module.css';
import { FC } from "react";
import { TNavigateTypes } from "../../services/types/navigate-types";

const ModalOverlay: FC<TNavigateTypes> = (props) => {
    return (
        <div onClick={props.closeModal} className={style.overlay}></div>
    )
}


export default ModalOverlay;
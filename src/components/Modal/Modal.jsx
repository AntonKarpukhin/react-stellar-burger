import style from './Modal.module.css'

import ReactDOM from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";


const Modal = (props) => {

    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape);

        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, [props.modal])

    const closeByEscape = (e) => {
        if (e.key === 'Escape' && props.modal) {
            props.openModal();
        }
    }

    const closeModal = (e) => {
        const target = e.target;
        if (target && (target.className.includes('popup') || target.className.includes('closeIcon'))) {
            props.openModal();
        }
    }

    return ReactDOM.createPortal((
        <div onClick={(e) => closeModal(e)} className={props.modal ? `${style.popup} ${style.popupOpen}` : style.popup}>
            <div className={style.container}>
                <div>
                    {props.children}
                </div>
                <button type='button' className={style.closeIcon}></button>
            </div>
        </div>
    ), modalRoot)
}

Modal.propTypes = {
    modal: PropTypes.bool,
    children: PropTypes.element,
    openModal: PropTypes.func
}

export default Modal;
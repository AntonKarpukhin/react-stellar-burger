import style from './modal.module.css'

import ReactDOM from "react-dom";
import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useModal } from "../../hooks/use-modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

    const { isModalOpen, openModal, closeModal } = useModal();

    useEffect(() => {

        const closeByEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                props.openModal();
            }
        }

        document.addEventListener('keydown', closeByEscape);

        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, [isModalOpen])

    const closeModals = (e) => {
        const target = e.currentTarget;
        if (target && (target.className.includes('popup') || target.className.includes('closeIcon'))) {
            props.openModal();
        }
    }
    return ReactDOM.createPortal((
        <Fragment>
            <ModalOverlay/>
            <div onClick={(e) => closeModals(e)} className={isModalOpen ? `${style.popup} ${style.popupOpen}` : style.popup}>
                <div className={style.container}>
                    <div>
                        {props.children}
                    </div>
                    <button type='button' className={style.closeIcon}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
            </div>
        </Fragment>
    ), modalRoot)
}

Modal.propTypes = {
    children: PropTypes.element,
    openModal: PropTypes.func
}

export default Modal;
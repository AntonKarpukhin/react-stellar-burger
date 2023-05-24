import style from './modal.module.css'

import ReactDOM from "react-dom";
import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

    const { modal, closeModal } = props;

    useEffect(() => {

        const closeByEscape = (e) => {
            if (e.key === 'Escape' && modal) {
                closeModal();
            }
        }

        document.addEventListener('keydown', closeByEscape);

        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, [modal])

    const closeModals = (e) => {
        const target = e.currentTarget;
        if (target && (target.className.includes('popup') || target.className.includes('closeIcon'))) {
            closeModal();
        }
    }

    return ReactDOM.createPortal((
        <Fragment>
            <ModalOverlay modalActive={modal} />
            <div onClick={closeModals} className={modal ? `${style.popup} ${style.popupOpen}` : style.popup}>
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
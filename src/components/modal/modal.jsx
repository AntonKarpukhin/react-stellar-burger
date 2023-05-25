import style from './modal.module.css'

import ReactDOM from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

    const { closeModal } = props;

    useEffect(() => {

        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', closeByEscape);

        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, [closeModal])

    return ReactDOM.createPortal((
        <section className={style.sectionWrapper}>
            <ModalOverlay closeModal={closeModal}  />
            <div className={style.popup}>
                <div className={style.container}>
                    <div>
                        {props.children}
                    </div>
                    <button type='button' className={style.closeIcon}>
                        <CloseIcon onClick={closeModal} type="primary" />
                    </button>
                </div>
            </div>
        </section>
    ), modalRoot)
}

Modal.propTypes = {
    children: PropTypes.element,
    openModal: PropTypes.func
}

export default Modal;
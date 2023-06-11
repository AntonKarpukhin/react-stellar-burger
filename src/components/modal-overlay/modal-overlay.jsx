import style from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    return (
        <div onClick={props.closeModal} className={style.overlay}></div>
    )
}


export default ModalOverlay;
import style from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    return (
        <div className={props.modalActive ? `${style.overlay} ${style.overlayOpen}` : style.overlay}></div>
    )
}


export default ModalOverlay;
import style from "../ingredient-constructor/ingredient-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { moveIngredient } from "../../services/actions/constructorBurger";


const IngredientConstructor = (props) => {

    const {item, removeIngredient, index} = props
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index
            const hoverIndex = index

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(moveIngredient({dragIndex, hoverIndex}))
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, dragRef] = useDrag({
        type: 'item',
        item: () => {
            return {item: item.key, index};
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    dragRef(dropTarget(ref))

    return (
        <div ref={ref} className={ isDragging ? `${style.item} mb-4 ${style.itemActive}` : `${style.item} mb-4`} >
            <DragIcon type="primary" />
            <div  >
                <ConstructorElement handleClose={(e) => removeIngredient(e, item.key)} text={item.name} price={item.price} thumbnail={item.image}/>
            </div>
        </div>
    )
}

export default IngredientConstructor;
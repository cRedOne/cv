import React, { useState } from 'react';
import "./ContentBlock.css";  // Импортируем CSS файл

const ContentBlock = ({ id, title, content, isActive, onSwipe }) => {
    const [dragStartX, setDragStartX] = useState(null); // Начальная позиция мыши
    const [dragging, setDragging] = useState(false); // Флаг, показывающий, что перетаскивание активно
    const [dragDistance, setDragDistance] = useState(0); // Текущее расстояние перемещения

    const handleMouseDown = (e) => {
        e.preventDefault(); // Останавливаем выделение текста
        setDragStartX(e.clientX); // Запоминаем стартовую позицию мыши
        setDragging(true); // Включаем флаг перетаскивания
        setDragDistance(0); // Сбрасываем расстояние
    };

    const handleMouseMove = (e) => {
        if (!dragging || dragStartX === null) return;

        const newDragDistance = e.clientX - dragStartX; // Вычисляем текущее расстояние перемещения
        setDragDistance(newDragDistance); // Обновляем текущие данные о перемещении
    };

    const handleMouseUp = () => {
        setDragging(false); // Завершаем перетаскивание
        setDragStartX(null);

        // Если перетаскивание прошло больше чем на 100px влево или вправо, переключаем блок
        if (Math.abs(dragDistance) > 100) {
            if (dragDistance > 0) {
                onSwipe('prev'); // Переключение на предыдущий блок
            } else {
                onSwipe('next'); // Переключение на следующий блок
            }
        }
    };

    const handleMouseLeave = () => {
        if (dragging) {
            handleMouseUp(); // Обработаем завершение перетаскивания при уходе мыши
        }
    };

    return (
        <div
            className={`content-block ${isActive ? 'active' : ''}`}
            id={id}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div className="content">
                <h2>{title}</h2>
                <div>{content}</div> {/* Используем div вместо p для контента */}
            </div>
        </div>
    );
};

export default ContentBlock;

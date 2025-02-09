import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./AnimatedBackground.css";  // Импортируем CSS файл

// Функция для получения случайного неонового цвета
const getRandomNeonColor = () => {
    const neonColors = [
        "#39FF14", // Неоново-зеленый
        "#FF6EC7", // Неоново-розовый
        "#00FFFF", // Неоново-голубой
        "#9b00ff", // Неоново-фиолетовый
        "#FF4500", // Неоново-оранжевый
    ];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
};

// Константы
const LINE_LENGTH_VARIATION = 2; // На сколько линия будет удлиняться
const LINE_GROWTH_DURATION = 5; // Длительность увеличения линии
const MIN_HORIZONTAL_VARIATION = 5; // Максимальный сдвиг по горизонтали (в процентах)
const MIN_VERTICAL_DISTANCE = 10; // Минимальное расстояние между линиями по вертикали
const VERTICAL_VARIATION = 30; // Разброс вертикальной позиции (увеличиваем)

const getRandomVerticalPosition = (verticalPositions) => {
    let position;
    let isTooClose = true;

    while (isTooClose) {
        // Увеличиваем диапазон вертикальных позиций
        position = Math.random() * 100;
        // Проверяем, что вертикальная позиция не слишком близка к другим
        isTooClose = verticalPositions.some(p => Math.abs(p - position) < MIN_VERTICAL_DISTANCE);
    }

    return position;
};

const Line = ({ delay, verticalPositions, setVerticalPositions, index }) => {
    const [color, setColor] = useState(getRandomNeonColor());
    const [position, setPosition] = useState(0);
    const [verticalPosition, setVerticalPosition] = useState(getRandomVerticalPosition(verticalPositions));

    useEffect(() => {
        // Равномерное распределение по горизонтали
        const basePosition = (index / 10) * 100;  // Позиции распределяются равномерно от 0 до 100%
        const offset = (Math.random() - 0.5) * MIN_HORIZONTAL_VARIATION;  // Случайный сдвиг по горизонтали
        const finalPosition = basePosition + offset;
        setPosition(finalPosition);

        // Сохраняем вертикальную позицию
        setVerticalPositions(prev => [...prev, verticalPosition]);
    }, [index, verticalPosition, setVerticalPositions]);

    // Изменение цвета каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            setColor(getRandomNeonColor());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Тень для эффекта свечения, соответствующая цвету линии
    const boxShadow = `0 0 15px 5px ${color}`;

    return (
        <motion.div
            className="line"
            initial={{ scaleY: 0.9 }}
            animate={{
                scaleY: LINE_LENGTH_VARIATION,
                backgroundColor: color,
                boxShadow: boxShadow,
            }}
            transition={{
                duration: LINE_GROWTH_DURATION, // Используем константу для контроля времени удлинения
                repeat: Infinity,
                repeatType: "mirror",
                delay,
                backgroundColor: { duration: 3, ease: "easeInOut" },
                boxShadow: { duration: 3, ease: "easeInOut" },
            }}
            style={{
                left: `${position}%`,  // Позиция по горизонтали с сдвигом
                top: `${verticalPosition}%`,  // Вертикальная позиция случайно генерируется
            }}
        />
    );
};

const AnimatedBackground = () => {
    const [verticalPositions, setVerticalPositions] = useState([]);
    const linesCount = 10;  // Количество линий

    return (
        <div className="background">
            {[...Array(linesCount)].map((_, i) => (
                <Line
                    key={i}
                    delay={i * 0.5}
                    verticalPositions={verticalPositions}
                    setVerticalPositions={setVerticalPositions}
                    index={i}
                />
            ))}
        </div>
    );
};

export default AnimatedBackground;

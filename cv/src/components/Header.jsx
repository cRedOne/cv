import React, { useState } from "react";
import { Switch } from "@mui/material";  // Импортируем переключатели Material-UI
import LogoParticles from "./LogoParticles";  // Импортируем компонент анимации лого
import "./Header.css";  // Импортируем стили

const Header = ({ onMenuClick, onLanguageChange, language }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);  // Состояние для темной темы

    // Функция для изменения состояния меню
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    // Функции для переключателей
    const handleDarkModeChange = (event) => {
        setDarkMode(event.target.checked);
    };

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.checked ? "ua" : "en";
        onLanguageChange(newLanguage);  // Передаем выбранный язык в родительский компонент
    };

    // Функция для обработки клика по пункту меню
    const handleMenuItemClick = (index) => {
        onMenuClick(index);  // Вызываем функцию передвижения слайдера из `App.js`
        setMenuOpen(false);  // Закрываем меню после клика
    };

    return (
        <header className="header">
            {/* Логотип с анимацией */}
            <div className="logo">
                {/*<LogoParticles />  Вставляем компонент анимации */}
                cRedOne
            </div>

            <div
                className={`menu-icon ${menuOpen ? "open" : ""}`}
                onClick={toggleMenu}
            >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* Меню */}
            <div className={`menu ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li onClick={() => handleMenuItemClick(0)}>About Me</li>
                    <li onClick={() => handleMenuItemClick(1)}>Education</li>
                    <li onClick={() => handleMenuItemClick(2)}>Work Experience</li>
                    <li onClick={() => handleMenuItemClick(3)}>Skills</li>
                    <li onClick={() => handleMenuItemClick(4)}>Contact</li>
                </ul>
                {/* Горизонтальная линия */}
                <hr className="separator" />

                {/* Переключатели для темы и языка */}
                <div className="switch-container">
                    {/*<div>
                        <label>Light Mode</label>
                        <Switch checked={darkMode} onChange={handleDarkModeChange} />
                    </div>*/}
                    <div>
                        <label>Ukr</label>
                        <Switch checked={language === "ua"} onChange={handleLanguageChange} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

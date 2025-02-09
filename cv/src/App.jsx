import React, { useState, useEffect } from 'react';
import AnimatedBackground from "./components/AnimatedBackground";
import Header from "./components/Header";
import ContentBlock from "./components/ContentBlock";
import languageData from './components/translations.json'; // Импортируем данные перевода
import './App.css';

export default function App() {
    const [activeBlock, setActiveBlock] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [language, setLanguage] = useState('en');  // Состояние для языка

    // Функция получения данных для выбранного языка
    const getDataForLanguage = (lang) => {
        return languageData[lang] || languageData['en']; // Если языка нет, возвращаем данные по умолчанию (английский)
    }

    // Блоки с данными
    const blocks = [
        {
            id: 'aboutMe',
            title: getDataForLanguage(language).about?.title || 'About Me',
            content: (
                <>
                    <p>{getDataForLanguage(language).about?.description || 'No description available.'}</p>
                    <p>{getDataForLanguage(language).about?.additional || 'No additional data available.'}</p>
                </>
            )
        },
        {
            id: 'education',
            title: getDataForLanguage(language).education?.title || 'Education',
            content: getDataForLanguage(language).education?.map((item, index) => (
                <div key={index}>
                    <p><strong>{item.period}</strong></p>
                    <p>{item.description}</p>
                </div>
            )) || <p>No education data available.</p>
        },
        {
            id: 'workExperience',
            title: getDataForLanguage(language).work_experience?.title || 'Work Experience',
            content: getDataForLanguage(language).work_experience?.map((item, index) => (
                <div key={index}>
                    <p><strong>{item.period}</strong></p>
                    <p>{item.description}</p>
                </div>
            )) || <p>No work experience data available.</p>
        },
        {
            id: 'skills',
            title: getDataForLanguage(language).skills?.title || 'Skills',
            content: getDataForLanguage(language).skills?.map((item, index) => (
                <div key={index}>
                    <p><strong>{item.skill}</strong></p>
                    <p>{item.description}</p>
                </div>
            )) || <p>No skills data available.</p>
        },
        {
            id: 'contact',
            title: getDataForLanguage(language).contacts?.title || 'Contact',
            content: (
                <a href={`mailto:${getDataForLanguage(language).contacts?.email}`} className="email-link">
                    {getDataForLanguage(language).contacts?.email || 'No contact data available.'}
                </a>
            )
        }
    ];

    const handleMenuClick = (index) => {
        setActiveBlock(index);
    };

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);  // Изменяем язык
    };

    const handleSwipe = (direction) => {
        if (direction === 'next' && activeBlock < blocks.length - 1) {
            setActiveBlock(prev => prev + 1);
        } else if (direction === 'prev' && activeBlock > 0) {
            setActiveBlock(prev => prev - 1);
        }
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0 && activeBlock < blocks.length - 1) {
                setActiveBlock(activeBlock + 1);
            } else if (diffX < 0 && activeBlock > 0) {
                setActiveBlock(activeBlock - 1);
            }
            setIsSwiping(false);
        }
    };

    const handleTouchEnd = () => {
        setIsSwiping(false);
    };

    useEffect(() => {
        // Убедимся, что блоки обновляются при смене языка
    }, [language]);

    return (
        <div className="relative w-screen h-screen flex items-center justify-center">
            <AnimatedBackground />
            <Header onMenuClick={handleMenuClick} onLanguageChange={handleLanguageChange} language={language} />

            <div
                className="content-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="content-blocks"
                    style={{ transform: `translateX(calc(-${activeBlock} * 90vw + 10vw))` }}
                >
                    {blocks.map((block, index) => (
                        <ContentBlock
                            key={block.id}
                            id={block.id}
                            title={block.title}
                            content={block.content}
                            isActive={activeBlock === index}
                            onSwipe={handleSwipe}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

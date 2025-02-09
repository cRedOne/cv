import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const LogoParticles = () => {
    const [particlesLoaded, setParticlesLoaded] = useState(false);

    // Инициализация частиц
    const particlesInit = async (main) => {
        await loadFull(main); // Загрузим все частицы и их плагины
    };

    const handleParticlesLoaded = (container) => {
        setParticlesLoaded(true);
    };

    const splitTextIntoSpans = (text) => {
        return text.split("").map((char, index) => (
            <span key={index} className="letter">
                {char}
            </span>
        ));
    };

    return (
        <div className="logo-container" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Контейнер частиц */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={handleParticlesLoaded}
                options={{
                    particles: {
                        number: {
                            value: 50,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: 3,
                        },
                        move: {
                            enable: true,
                            speed: 1,
                        },
                    },
                }}
            />

            {/* Логотип с анимацией частиц */}
            <div className="logo" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                {splitTextIntoSpans("My Way")}
            </div>
        </div>
    );
};

export default LogoParticles;

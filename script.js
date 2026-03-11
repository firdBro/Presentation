/**
 * OMNI-UI ENGINE v3.0 | STABLE VISUALS ONLY
 * Задача: Только декор. Логика слайдов остается на Reveal.js.
 */

(function() {
    const UI_ENGINE = {
        init() {
            // Ждем, пока DOM подгрузится, чтобы не было ошибок с поиском элементов
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
        },

        start() {
            this.injectCoreStyles();
            this.createCursor();
            this.launchParticles();
            this.setupParallax();
            console.log("💎 UI Engine v3.0: Visual FX Only.");
        },

        // 1. Стили для курсора и мягкости анимаций
        injectCoreStyles() {
            const style = document.createElement('style');
            style.textContent = `
                #custom-cursor {
                    position: fixed; top: 0; left: 0; width: 20px; height: 20px;
                    background: rgba(0, 122, 255, 0.5); border-radius: 50%;
                    pointer-events: none; z-index: 10000; 
                    transition: width 0.3s, height 0.3s, background 0.3s;
                    backdrop-filter: blur(4px); transform: translate(-50%, -50%);
                    display: none; /* Скрыт на мобилках */
                }
                @media (pointer: fine) { #custom-cursor { display: block; } }
                
                .bg-particle {
                    position: fixed; border-radius: 50%; pointer-events: none; z-index: -1;
                    filter: blur(60px); opacity: 0; transition: opacity 2s;
                }
                
                /* Фикс для плавности контента */
                .slide-content { 
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease; 
                }
            `;
            document.head.appendChild(style);
        },

        // 2. iPadOS Курсор (без привязки к логике слайдов)
        createCursor() {
            const cursor = document.createElement('div');
            cursor.id = 'custom-cursor';
            document.body.appendChild(cursor);

            document.addEventListener('mousemove', e => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            // Масштабирование при наведении на важные объекты
            document.addEventListener('mouseover', e => {
                if (e.target.closest('h1, h3, li, img, .image-box')) {
                    cursor.style.width = '70px';
                    cursor.style.height = '70px';
                    cursor.style.background = 'rgba(0, 122, 255, 0.1)';
                } else {
                    cursor.style.width = '20px';
                    cursor.style.height = '20px';
                    cursor.style.background = 'rgba(0, 122, 255, 0.5)';
                }
            });
        },

        // 3. Лайт-система частиц (не грузит процессор)
        launchParticles() {
            const colors = ['#007aff', '#ffcc00', '#ff5500'];
            const spawn = () => {
                const p = document.createElement('div');
                p.className = 'bg-particle';
                const size = Math.random() * 200 + 100;
                
                Object.assign(p.style, {
                    width: size + 'px', height: size + 'px',
                    left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
                    background: colors[Math.floor(Math.random() * colors.length)]
                });

                document.body.appendChild(p);

                setTimeout(() => p.style.opacity = '0.12', 100);
                setTimeout(() => {
                    p.style.opacity = '0';
                    setTimeout(() => p.remove(), 2000);
                }, 6000);
            };
            setInterval(spawn, 4000); // Реже спавн — меньше лагов
        },

        // 4. Легкий Параллакс только для активного слайда
        setupParallax() {
            document.addEventListener('mousemove', e => {
                const x = (window.innerWidth / 2 - e.clientX) / 40;
                const y = (window.innerHeight / 2 - e.clientY) / 40;

                // Двигаем только картинку в текущем (активном) слайде
                const activeImg = document.querySelector('.present .image-box img');
                if (activeImg) {
                    activeImg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
                }
            });
        }
    };

    UI_ENGINE.init();
})();
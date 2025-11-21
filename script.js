// Конфигурация Telegram
const TELEGRAM_CONFIG = {
    botToken: '8368222584:AAHyKAqlp40ZurJegwuhkX2psVSG6GTpZ1s',
    chatId: '5623324059',
    apiUrl: 'https://api.telegram.org/bot'
};

// Защита от спама
let lastSubmissionTime = 0;
let isSubmitting = false;

// Определяем тип устройства
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent);

// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    setCurrentYear();
    initFormHandler();
    initSmoothScroll();
    initCharCounter();
    initMobileMenu();
    initPageLoader();
    
    // Инициализируем анимации только для ПК
    if (!isMobile && !isTablet) {
        initDesktopAnimations();
    }
}

// Инициализация анимаций для ПК
function initDesktopAnimations() {
    initScrollAnimations();
    initHoverEffects();
    createParticles();
    initBackToTop();
    initPhilosophyOrb();
    initInteractiveElements();
    initParallaxEffect();
}

// Создание частиц для ПК
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайная позиция и анимация
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.background = getRandomColor();
        
        container.appendChild(particle);
    }
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#48dbfb', '#feca57', '#ff9ff3'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Интерактивная философская сфера для ПК
function initPhilosophyOrb() {
    const orb = document.getElementById('philosophyOrb');
    if (!orb) return;

    let clickCount = 0;
    const messages = [
        "Истина где-то рядом...",
        "Бытие определяет сознание",
        "Мыслю, следовательно существую",
        "Всё течёт, всё меняется",
        "Познай самого себя"
    ];

    orb.addEventListener('click', function() {
        clickCount++;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Создаем всплывающий текст
        const floatingText = document.createElement('div');
        floatingText.textContent = randomMessage;
        floatingText.style.cssText = `
            position: absolute;
            color: var(--secondary);
            font-weight: bold;
            pointer-events: none;
            animation: floatUp 2s ease-out forwards;
            text-shadow: 0 0 10px currentColor;
        `;

        // Позиционируем относительно сферы
        const orbRect = orb.getBoundingClientRect();
        floatingText.style.left = '50%';
        floatingText.style.top = '0';
        floatingText.style.transform = 'translateX(-50%)';

        orb.appendChild(floatingText);

        // Удаляем текст после анимации
        setTimeout(() => {
            if (floatingText.parentNode) {
                floatingText.parentNode.removeChild(floatingText);
            }
        }, 2000);

        // Анимация сферы
        orb.style.transform = 'scale(1.2)';
        setTimeout(() => {
            orb.style.transform = 'scale(1)';
        }, 300);

        // Меняем цвет каждые 3 клика
        if (clickCount % 3 === 0) {
            const colors = ['#48dbfb', '#ff6b6b', '#feca57', '#ff9ff3'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.documentElement.style.setProperty('--secondary', randomColor);
        }
    });
}

// Добавляем стили для всплывающего текста
if (!isMobile && !isTablet) {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-50px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Инициализация интерактивных элементов для ПК
function initInteractiveElements() {
    // Анимация тегов при клике
    const tags = document.querySelectorAll('.desktop-hover.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Параллакс эффект для ПК
function initParallaxEffect() {
    window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const shapes = document.querySelectorAll('.shape, .morphing-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
}

// Кнопка "Наверх" для ПК
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            this.querySelector('i').className = mobileMenu.classList.contains('active') ? 
                'fas fa-times' : 'fas fa-bars';
        });
        
        // Закрытие меню при клике на ссылку
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                menuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
        
        // Закрытие меню при клике вне его
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                menuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
        
        // Закрытие меню при нажатии ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                menuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
}

// Анимация загрузки страницы
function initPageLoader() {
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);

        // Запускаем анимации после загрузки только для ПК
        if (!isMobile && !isTablet) {
            setTimeout(() => {
                const elements = document.querySelectorAll('.fade-in, .slide-in');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translate(0)';
                    }, index * 200);
                });
            }, 500);
        }
    });
}

// Установка текущего года
function setCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Счетчик символов
function initCharCounter() {
    const textarea = document.querySelector('textarea[name="message"]');
    const counter = document.querySelector('.char-counter');
    
    if (textarea && counter) {
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length}/1000`;
            
            // Меняем цвет при приближении к лимиту
            counter.className = 'char-counter';
            if (length > 800) counter.classList.add('warning');
            if (length > 950) counter.classList.add('danger');
        });
    }
}

// Обработчик формы с отправкой в Telegram
function initFormHandler() {
    const form = document.getElementById('contact-form');
    const statusElement = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) {
            showFormStatus('error', '❌ Пожалуйста, дождитесь завершения предыдущей отправки', statusElement);
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Защита от спама
        const currentTime = Date.now();
        if (currentTime - lastSubmissionTime < 30000) {
            showFormStatus('error', '❌ Пожалуйста, подождите 30 секунд перед следующим сообщением', statusElement);
            return;
        }
        lastSubmissionTime = currentTime;
        isSubmitting = true;
        
        // Получаем данные формы
        const formData = new FormData(this);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            subject: formData.get('subject').trim(),
            message: formData.get('message').trim(),
            timestamp: new Date().toLocaleString('ru-RU'),
            ip: await getIP()
        };
        
        // Валидация
        if (!validateForm(data, statusElement)) {
            isSubmitting = false;
            return;
        }
        
        // Показываем статус отправки
        showFormStatus('sending', '📨 Отправка сообщения...', statusElement);
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        try {
            // Отправляем в Telegram
            const success = await sendToTelegram(data);
            
            if (success) {
                showFormStatus('success', '✅ Сообщение отправлено! Я свяжусь с вами в ближайшее время.', statusElement);
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
                submitBtn.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
                
                // Показываем уведомление
                showNotification('Сообщение успешно отправлено!', 'success');
                
                // Очищаем форму через 3 секунды
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    hideFormStatus(statusElement);
                    
                    // Сбрасываем счетчик символов
                    const counter = document.querySelector('.char-counter');
                    if (counter) {
                        counter.textContent = '0/1000';
                        counter.className = 'char-counter';
                    }
                    
                    isSubmitting = false;
                }, 3000);
            } else {
                throw new Error('Ошибка отправки в Telegram');
            }
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showFormStatus('error', '❌ Ошибка отправки. Пожалуйста, попробуйте еще раз или напишите мне напрямую в Telegram.', statusElement);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            
            // Показываем уведомление об ошибке
            showNotification('Ошибка отправки сообщения', 'error');
            isSubmitting = false;
        }
    });
}

// Получение IP адреса
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'Не удалось определить';
    }
}

// Валидация формы
function validateForm(data, statusElement) {
    if (!data.name || data.name.length < 2) {
        showFormStatus('error', '❌ Пожалуйста, введите ваше имя (минимум 2 символа)', statusElement);
        return false;
    }
    
    if (data.name.length > 50) {
        showFormStatus('error', '❌ Имя слишком длинное (максимум 50 символов)', statusElement);
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFormStatus('error', '❌ Пожалуйста, введите корректный email', statusElement);
        return false;
    }
    
    if (!data.subject || data.subject.length < 5) {
        showFormStatus('error', '❌ Пожалуйста, введите тему сообщения (минимум 5 символов)', statusElement);
        return false;
    }
    
    if (data.subject.length > 100) {
        showFormStatus('error', '❌ Тема слишком длинная (максимум 100 символов)', statusElement);
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showFormStatus('error', '❌ Пожалуйста, введите сообщение (минимум 10 символов)', statusElement);
        return false;
    }
    
    if (data.message.length > 1000) {
        showFormStatus('error', '❌ Сообщение слишком длинное (максимум 1000 символов)', statusElement);
        return false;
    }
    
    return true;
}

// Проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Отправка в Telegram
async function sendToTelegram(data) {
    const message = `📨 НОВОЕ СООБЩЕНИЕ С САЙТА

👤 Имя: ${data.name}
📧 Email: ${data.email}
📝 Тема: ${data.subject}

💬 Сообщение:
${data.message}

⏰ Время: ${data.timestamp}
🌐 IP: ${data.ip}
🔗 Сайт: razetka2010.github.io`;
    
    const url = `${TELEGRAM_CONFIG.apiUrl}${TELEGRAM_CONFIG.botToken}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.chatId,
                text: message
            })
        });
        
        const result = await response.json();
        
        if (result.ok) {
            return true;
        } else {
            console.error('Telegram error details:', result);
            return false;
        }
        
    } catch (error) {
        console.error('Telegram API error:', error);
        return false;
    }
}

// Управление статусом формы
function showFormStatus(type, message, element) {
    if (element) {
        element.textContent = message;
        element.className = `form-status ${type}`;
        element.style.display = 'block';
        
        // Автоскрытие для ошибок
        if (type === 'error') {
            setTimeout(() => {
                hideFormStatus(element);
            }, 5000);
        }
    }
}

function hideFormStatus(element) {
    if (element) {
        element.style.display = 'none';
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем мобильное меню если открыто
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    document.querySelector('.mobile-menu-btn i').className = 'fas fa-bars';
                }
                
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимации при скролле для ПК
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('philosophy-card')) {
                    const cards = document.querySelectorAll('.philosophy-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-in, .philosophy-card, .stat-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Эффекты при наведении для ПК
function initHoverEffects() {
    const cards = document.querySelectorAll('.philosophy-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Всплывающие уведомления
function showNotification(message, type = 'info') {
    // Удаляем существующие уведомления
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    });
    
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 
        'linear-gradient(45deg, #2ecc71, #27ae60)' : 
        'linear-gradient(45deg, #e74c3c, #c0392b)';
    
    notification.className = 'custom-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        font-weight: bold;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        max-width: 300px;
        text-align: center;
        font-size: 0.9rem;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Глобальная функция для кнопок
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Закрываем мобильное меню если открыто
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.querySelector('.mobile-menu-btn i').className = 'fas fa-bars';
        }
        
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Упрощенный ресайз хендлер
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Обновляем мобильное меню при ресайзе
        const mobileMenu = document.querySelector('.mobile-menu');
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.querySelector('.mobile-menu-btn i').className = 'fas fa-bars';
        }
    }, 250);
});

// Логируем тип устройства для отладки
console.log(`🚀 Устройство: ${isMobile ? 'Мобильное' : isTablet ? 'Планшет' : 'ПК'}`);

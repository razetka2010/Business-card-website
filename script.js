// Конфигурация Telegram
const TELEGRAM_CONFIG = {
    botToken: '8368222584:AAHyKAqlp40ZurJegwuhkX2psVSG6GTpZ1s', // Токен бота
    chatId: '5623324059', // Твой Chat ID
    apiUrl: 'https://api.telegram.org/bot'
};

// Защита от спама
let lastSubmissionTime = 0;

// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    setCurrentYear();
    initFormHandler();
    initSmoothScroll();
    initScrollAnimations();
    initHoverEffects();
    initCharCounter();
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
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Защита от спама
        const currentTime = Date.now();
        if (currentTime - lastSubmissionTime < 30000) { // 30 секунд
            showFormStatus('error', '❌ Пожалуйста, подождите 30 секунд перед следующим сообщением', statusElement);
            return;
        }
        lastSubmissionTime = currentTime;
        
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
        if (!validateForm(data, statusElement)) return;
        
        // Показываем статус отправки
        showFormStatus('sending', '📨 Отправка сообщения...', statusElement);
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        submitBtn.classList.add('sending-animation');
        
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
                    submitBtn.classList.remove('sending-animation');
                    hideFormStatus(statusElement);
                    
                    // Сбрасываем счетчик символов
                    const counter = document.querySelector('.char-counter');
                    if (counter) {
                        counter.textContent = '0/1000';
                        counter.className = 'char-counter';
                    }
                }, 3000);
            } else {
                throw new Error('Ошибка отправки в Telegram');
            }
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showFormStatus('error', '❌ Ошибка отправки. Пожалуйста, попробуйте еще раз или напишите мне напрямую в Telegram.', statusElement);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('sending-animation');
            submitBtn.style.background = '';
            
            // Показываем уведомление об ошибке
            showNotification('Ошибка отправки сообщения', 'error');
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
    
    if (!data.email || !isValidEmail(data.email)) {
        showFormStatus('error', '❌ Пожалуйста, введите корректный email', statusElement);
        return false;
    }
    
    if (!data.subject || data.subject.length < 5) {
        showFormStatus('error', '❌ Пожалуйста, введите тему сообщения (минимум 5 символов)', statusElement);
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
        console.log('Telegram response:', result);
        
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
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимации при скролле
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

// Эффекты при наведении
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
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 
        'linear-gradient(45deg, #2ecc71, #27ae60)' : 
        'linear-gradient(45deg, #e74c3c, #c0392b)';
    
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
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Дополнительные функции для улучшения UX

// Анимация загрузки страницы
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Обработка ошибок сети
window.addEventListener('online', function() {
    showNotification('Соединение восстановлено', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Отсутствует интернет-соединение', 'error');
});

// Предотвращение двойной отправки формы
let isSubmitting = false;

// Обновим обработчик формы для защиты от двойной отправки
const originalFormHandler = initFormHandler;
initFormHandler = function() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        
        isSubmitting = true;
        
        try {
            await originalFormHandler.call(this, e);
        } finally {
            setTimeout(() => {
                isSubmitting = false;
            }, 3000);
        }
    });
};

// Инициализируем улучшенный обработчик
initFormHandler();

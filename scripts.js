// Инициализация частиц для фона
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Валидация формы
function initForm() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('message');
    const charCounter = document.getElementById('charCounter');
    const formStatus = document.getElementById('formStatus');
    
    if (message && charCounter) {
        message.addEventListener('input', () => {
            const length = message.value.length;
            charCounter.textContent = `${length}/500`;
            
            charCounter.className = 'char-counter';
            if (length > 400) charCounter.classList.add('warning');
            if (length > 480) charCounter.classList.add('danger');
        });
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formStatus.className = 'form-status sending';
            formStatus.textContent = 'Отправка сообщения...';
            formStatus.style.display = 'block';
            
            // Имитация отправки
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Сообщение успешно отправлено!';
                form.reset();
                charCounter.textContent = '0/500';
                charCounter.className = 'char-counter';
            }, 2000);
        });
    }
}

// Кнопка возврата наверх
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
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
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
        observer.observe(el);
    });
}

// Интерактивная сфера
function initInteractiveOrb() {
    const orb = document.querySelector('.philosophy-orb');
    
    if (orb) {
        orb.addEventListener('click', () => {
            orb.style.transform = 'scale(1.2)';
            setTimeout(() => {
                orb.style.transform = 'scale(1)';
            }, 300);
            
            // Показать случайную философскую цитату
            const quotes = [
                "Код - это поэзия, написанная на языке логики",
                "Каждая программа начинается с первой строчки",
                "Искусство программирования - это искусство решения проблем",
                "Простота - высшая форма сложности"
            ];
            
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            alert(randomQuote);
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initMobileMenu();
    initForm();
    initBackToTop();
    initScrollAnimations();
    initInteractiveOrb();
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
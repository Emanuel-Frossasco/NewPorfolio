let currentLang = 'es';

// Función para cambiar el idioma
function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    const elements = document.querySelectorAll('[data-' + currentLang + ']');

    elements.forEach(element => {
        element.textContent = element.getAttribute('data-' + currentLang);
    });

    document.querySelector('.lang-toggle').textContent = currentLang === 'es' ? 'EN' : 'ES';
    document.documentElement.lang = currentLang;
}

// Función para descargar el CV
function downloadCV() {
    // Definir las rutas de los archivos PDF según el idioma
    const cvPaths = {
        es: 'pdf/Frossasco_Emanuel_CV_Es.pdf',  // Ruta del CV en español
        en: 'pdf/Frossasco_Emanuel_CV_En.pdf'   // Ruta del CV en inglés
    };

    // Seleccionar el archivo según el idioma actual
    const cvPath = cvPaths[currentLang];

    // Crear un elemento <a> temporal para forzar la descarga
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = cvPath;
    a.download = `Emanuel_Frossasco_CV_${currentLang.toUpperCase()}.pdf`;

    // Agregar al DOM, hacer clic y remover
    document.body.appendChild(a);
    a.click();

    // Limpiar después de un breve delay
    setTimeout(() => {
        document.body.removeChild(a);
    }, 100);
}

// Smooth scrolling para los enlaces de navegación
document.addEventListener('DOMContentLoaded', function () {
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

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Animación de aparición de elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Apply staggered delay based on index in the current batch
            // Note: This index is relative to the batch of entries being processed at this exact moment
            // To make it more robust for grids, we could stick to simple counters or just use the batch index
            const delay = index * 150; // 150ms delay per item

            setTimeout(() => {
                entry.target.classList.add('visible');
                // Remove the class after animation to clean up (optional, but keeps DOM clean)
                // or keep it to ensure it stays visible. 
                // In this case, we'll keep the direct inline style manipulation replacement:
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);

            // Unobserve after showing
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Add base transition styles
    document.querySelectorAll('.value-card, .project-card, .skill-item').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';

        observer.observe(card);
    });
});

// Efecto de escritura para el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Inicializar efecto de escritura cuando la página carga
window.addEventListener('load', function () {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Efecto parallax sutil reemplazado por Zoom
window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.bg-animation');
    if (parallax) {
        // En vez de moverlo (translateY), lo escalamos sutilmente
        // 1 + (scroll * factor muy pequeño)
        const scale = 1 + (scrolled * 0.0002);
        parallax.style.transform = `scale(${scale})`;
    }
});

// Contador animado para estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Easter egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-konamiSequence.length);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activado
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);

        // Mostrar mensaje especial
        const message = document.createElement('div');
        message.innerHTML = currentLang === 'es' ?
            '🎮 ¡Código Konami activado! Modo Game Developer ON' :
            '🎮 Konami Code activated! Game Developer Mode ON';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'var(--neon-cyan)';
        message.style.color = 'var(--dark-bg)';
        message.style.padding = '2rem';
        message.style.zIndex = '10000';
        message.style.fontFamily = 'Orbitron, monospace';
        message.style.fontSize = '1.2rem';
        message.style.textAlign = 'center';
        message.style.borderRadius = '10px';
        message.style.boxShadow = '0 0 50px var(--neon-cyan)';

        document.body.appendChild(message);

        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);

        konamiCode = [];
    }
});

// Optimización de rendimiento: Lazy loading para imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
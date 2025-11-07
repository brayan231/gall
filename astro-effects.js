// ===== SCRIPT-ASTRO.JS - COMPLETO Y UNIFICADO =====

// ===== CONFIGURACIÓN Y CONSTANTES =====
const ASTRO_CONFIG = {
    colors: {
        primary: '#4361ee',
        secondary: '#3a0ca3',
        accent: '#f72585',
        neon: '#4cc9f0',
        cosmic: '#7209b7',
        galaxy: '#3a0ca3'
    },
    animations: {
        float: 'floatAstro 6s ease-in-out infinite',
        glow: 'glowPulse 4s ease-in-out infinite',
        particle: 'particleFloat 8s infinite linear'
    },
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200
    }
};

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Iniciando Astro Framework...");
    
    // Precargar recursos esenciales
    preloadEssentialResources();
    
    // Inicializar sistema de temas
    initThemeSystem();
    
    // Cargar componentes dinámicos
    loadDynamicComponents().then(() => {
        // Inicializar todas las funcionalidades astro
        initializeAstroFeatures();
    });
});

// ===== SISTEMA DE PRECARGA =====
function preloadEssentialResources() {
    // Precargar fuentes críticas
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = font;
        document.head.appendChild(link);
    });
}

// ===== SISTEMA DE TEMAS =====
function initThemeSystem() {
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('astro-theme');
    
    // Aplicar tema
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    
    // Botón toggle de tema
    createThemeToggle();
}

function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'astro-theme-toggle';
    themeToggle.innerHTML = `
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
    `;
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('astro-theme', newTheme);
    
    // Efecto de transición
    document.documentElement.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 500);
}

// ===== CARGA DE COMPONENTES DINÁMICOS =====
async function loadDynamicComponents() {
    try {
        const basePath = getBasePath();
        
        // Cargar header y footer en paralelo
        const [headerData, footerData] = await Promise.all([
            loadComponent(`${basePath}partials/header.html`),
            loadComponent(`${basePath}partials/footer.html`)
        ]);
        
        // Insertar componentes
        if (headerData && document.getElementById('header-placeholder')) {
            document.getElementById('header-placeholder').innerHTML = headerData;
            initAstroHeader();
        }
        
        if (footerData && document.getElementById('footer-placeholder')) {
            document.getElementById('footer-placeholder').innerHTML = footerData;
        }
        
    } catch (error) {
        console.error('Error cargando componentes:', error);
    }
}

async function loadComponent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.text();
    } catch (error) {
        console.warn(`No se pudo cargar: ${url}`);
        return null;
    }
}

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/') || path.includes('/conocenos/') || path.includes('/programas/')) {
        return '../';
    }
    return './';
}

// ===== HEADER ASTRO =====
function initAstroHeader() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    // Crear overlay dinámico
    const overlay = createAstroOverlay();
    
    // Sistema de toggle mejorado
    const toggleAstroMenu = () => {
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
        
        // Animación del icono
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.className = isActive ? 'fas fa-bars' : 'fas fa-times';
            icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    };
    
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAstroMenu();
    });
    
    // Cerrar menú con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleAstroMenu();
        }
    });
    
    initHeaderScroll();
}

function createAstroOverlay() {
    let overlay = document.getElementById('astro-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'astro-overlay';
        overlay.className = 'astro-overlay';
        document.body.appendChild(overlay);
    }
    return overlay;
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== EFECTOS DE SCROLL ASTRO =====
function initAstroScrollEffects() {
    console.log("🌠 Iniciando efectos de scroll astro...");
    
    // Efecto parallax avanzado
    initAdvancedParallax();
    
    // Reveal de elementos al scroll
    initAstroReveal();
    
    // Efectos de distorsión y transform
    initScrollTransform();
    
    // Navegación por secciones
    initAstroSectionNavigation();
    
    // Efectos de progreso
    initScrollProgress();
}

// ===== PARALLAX AVANZADO =====
function initAdvancedParallax() {
    const parallaxElements = document.querySelectorAll('[data-astro-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
            const depth = element.getAttribute('data-parallax-depth') || '0';
            
            const elementTop = element.getBoundingClientRect().top + scrolled;
            const elementProgress = (scrolled - elementTop + windowHeight) / (windowHeight + element.offsetHeight);
            
            // Efecto parallax básico
            let translateY = -(scrolled * speed);
            
            // Efecto de profundidad 3D
            if (depth !== '0') {
                const depthValue = parseFloat(depth);
                element.style.transform = `translate3d(0, ${translateY}px, ${depthValue * elementProgress}px)`;
            } else {
                element.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
            
            // Efecto de opacidad basado en scroll
            if (element.hasAttribute('data-parallax-opacity')) {
                const opacity = 1 - Math.abs(elementProgress - 0.5) * 2;
                element.style.opacity = Math.max(0, Math.min(1, opacity));
            }
            
            // Efecto de escala
            if (element.hasAttribute('data-parallax-scale')) {
                const scale = 1 - (elementProgress * 0.3);
                element.style.transform += ` scale(${scale})`;
            }
        });
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateParallax);
    
    // Inicializar
    updateParallax();
}

// ===== REVEAL DE ELEMENTOS AL SCROLL =====
function initAstroReveal() {
    const revealElements = document.querySelectorAll('[data-astro-reveal]');
    
    if (revealElements.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-reveal-delay') || 0;
                const duration = element.getAttribute('data-reveal-duration') || '0.8s';
                
                setTimeout(() => {
                    element.classList.add('astro-revealed');
                    
                    // Efecto específico basado en tipo
                    const effect = element.getAttribute('data-reveal-effect') || 'fadeUp';
                    applyRevealEffect(element, effect);
                    
                }, parseInt(delay));
                
                revealObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        // Establecer estado inicial
        element.style.opacity = '0';
        element.style.transition = `all ${element.getAttribute('data-reveal-duration') || '0.8s'} cubic-bezier(0.4, 0, 0.2, 1)`;
        
        revealObserver.observe(element);
    });
}

function applyRevealEffect(element, effect) {
    const effects = {
        fadeUp: () => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        },
        fadeLeft: () => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        },
        fadeRight: () => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        },
        scale: () => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        },
        glow: () => {
            element.style.opacity = '1';
            element.style.filter = 'brightness(1)';
            element.classList.add('astro-glow-reveal');
        }
    };
    
    // Estado inicial basado en el efecto
    switch(effect) {
        case 'fadeUp':
            element.style.transform = 'translateY(50px)';
            break;
        case 'fadeLeft':
            element.style.transform = 'translateX(-50px)';
            break;
        case 'fadeRight':
            element.style.transform = 'translateX(50px)';
            break;
        case 'scale':
            element.style.transform = 'scale(0.8)';
            break;
        case 'glow':
            element.style.filter = 'brightness(0.5)';
            break;
    }
    
    // Aplicar efecto
    if (effects[effect]) {
        effects[effect]();
    }
}

// ===== EFECTOS DE TRANSFORMACIÓN EN SCROLL =====
function initScrollTransform() {
    const transformElements = document.querySelectorAll('[data-scroll-transform]');
    
    if (transformElements.length === 0) return;
    
    const transformObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const progress = Math.max(0, Math.min(1, entry.intersectionRatio));
            
            // Aplicar transformaciones basadas en el progreso
            applyScrollTransform(element, progress);
        });
    }, {
        threshold: Array.from({ length: 101 }, (_, i) => i * 0.01)
    });
    
    transformElements.forEach(element => {
        transformObserver.observe(element);
    });
}

function applyScrollTransform(element, progress) {
    const transformType = element.getAttribute('data-transform-type');
    
    switch(transformType) {
        case 'rotate':
            const rotateFrom = parseFloat(element.getAttribute('data-rotate-from')) || 0;
            const rotateTo = parseFloat(element.getAttribute('data-rotate-to')) || 360;
            const rotation = rotateFrom + (rotateTo - rotateFrom) * progress;
            element.style.transform = `rotate(${rotation}deg)`;
            break;
            
        case 'blur':
            const blurFrom = parseFloat(element.getAttribute('data-blur-from')) || 0;
            const blurTo = parseFloat(element.getAttribute('data-blur-to')) || 10;
            const blur = blurFrom + (blurTo - blurFrom) * (1 - progress);
            element.style.filter = `blur(${blur}px)`;
            break;
    }
}

// ===== NAVEGACIÓN POR SECCIONES ASTRO =====
function initAstroSectionNavigation() {
    const sections = document.querySelectorAll('[data-astro-section]');
    let navDots = document.querySelector('.astro-section-nav');
    
    if (sections.length === 0) return;
    
    // Crear navegación si no existe
    if (!navDots) {
        navDots = document.createElement('div');
        navDots.className = 'astro-section-nav';
        document.body.appendChild(navDots);
    }
    
    // Crear dots de navegación
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'astro-section-dot';
        dot.setAttribute('data-section', section.id);
        dot.innerHTML = `<span>${section.getAttribute('data-section-name') || `Sección ${index + 1}`}</span>`;
        
        dot.addEventListener('click', () => {
            scrollToSection(section.id);
        });
        
        navDots.appendChild(dot);
    });
    
    // Observar secciones activas
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const dot = navDots.querySelector(`[data-section="${sectionId}"]`);
            
            if (entry.isIntersecting) {
                dot?.classList.add('active');
            } else {
                dot?.classList.remove('active');
            }
        });
    }, {
        threshold: 0.6
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// ===== PROGRESO DE SCROLL =====
function initScrollProgress() {
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'astro-scroll-progress';
    document.body.appendChild(progressBar);
    
    // Indicador de progreso circular
    const circularProgress = document.createElement('div');
    circularProgress.className = 'astro-circular-progress';
    circularProgress.innerHTML = `
        <svg width="60" height="60">
            <circle class="progress-ring" cx="30" cy="30" r="28"></circle>
        </svg>
        <span class="progress-text">0%</span>
    `;
    document.body.appendChild(circularProgress);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.pageYOffset / documentHeight) * 100;
        
        // Barra lineal
        progressBar.style.width = `${scrolled}%`;
        
        // Progreso circular
        const circle = circularProgress.querySelector('.progress-ring');
        const circumference = 2 * Math.PI * 28;
        const offset = circumference - (scrolled / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
        
        circularProgress.querySelector('.progress-text').textContent = `${Math.round(scrolled)}%`;
        
        // Mostrar/ocultar basado en scroll
        if (scrolled > 5) {
            circularProgress.classList.add('visible');
        } else {
            circularProgress.classList.remove('visible');
        }
    });
}

// ===== EFECTOS DE IMÁGENES ASTRO =====
function initAstroImageEffects() {
    console.log("🖼️ Iniciando efectos de imágenes astro...");
    
    // Efecto hover en imágenes
    initImageHoverEffects();
    
    // Galería modal mejorada
    initAstroGallery();
    
    // Imágenes con parallax
    initImageParallax();
    
    // Efectos de carga
    initImageLoadingEffects();
}

// ===== EFECTOS HOVER EN IMÁGENES =====
function initImageHoverEffects() {
    const images = document.querySelectorAll('[data-astro-image]');
    
    images.forEach(img => {
        const container = img.closest('.image-container') || createImageContainer(img);
        const effect = img.getAttribute('data-image-effect') || 'glow';
        
        // Precargar imagen
        preloadImage(img).then(() => {
            img.classList.add('loaded');
        });
        
        container.addEventListener('mouseenter', () => {
            applyImageHoverEffect(container, effect, 'enter');
        });
        
        container.addEventListener('mouseleave', () => {
            applyImageHoverEffect(container, effect, 'leave');
        });
    });
}

function createImageContainer(img) {
    const container = document.createElement('div');
    container.className = 'astro-image-container';
    img.parentNode.insertBefore(container, img);
    container.appendChild(img);
    return container;
}

function preloadImage(img) {
    return new Promise((resolve) => {
        if (img.complete) {
            resolve();
        } else {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
        }
    });
}

function applyImageHoverEffect(container, effect, action) {
    const img = container.querySelector('img');
    
    const effects = {
        glow: () => {
            if (action === 'enter') {
                img.style.filter = 'brightness(1.2) contrast(1.1) saturate(1.2)';
                container.style.boxShadow = '0 0 30px rgba(67, 97, 238, 0.5)';
            } else {
                img.style.filter = 'brightness(1) contrast(1) saturate(1)';
                container.style.boxShadow = 'none';
            }
        },
        
        zoom: () => {
            if (action === 'enter') {
                img.style.transform = 'scale(1.05)';
            } else {
                img.style.transform = 'scale(1)';
            }
        },
        
        tilt: () => {
            if (action === 'enter') {
                container.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
            } else {
                container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        }
    };
    
    if (effects[effect]) {
        effects[effect]();
    }
}

// ===== GALERÍA ASTRO MEJORADA =====
function initAstroGallery() {
    const galleryItems = document.querySelectorAll('[data-astro-gallery]');
    const modal = createAstroModal();
    
    if (galleryItems.length === 0) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const imgSrc = item.getAttribute('data-image-src') || 
                          item.querySelector('img')?.src;
            const imgAlt = item.getAttribute('data-image-alt') || 
                          item.querySelector('img')?.alt || '';
            
            if (imgSrc) {
                openAstroModal(modal, imgSrc, imgAlt);
            }
        });
    });
}

function createAstroModal() {
    let modal = document.getElementById('astro-gallery-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'astro-gallery-modal';
        modal.className = 'astro-gallery-modal';
        modal.innerHTML = `
            <div class="astro-modal-content">
                <button class="astro-modal-close" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
                <div class="astro-modal-image-container">
                    <img class="astro-modal-image" src="" alt="" />
                    <div class="astro-modal-loader">
                        <div class="astro-spinner"></div>
                    </div>
                </div>
                <div class="astro-modal-info">
                    <div class="astro-modal-title"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Event listeners del modal
        initAstroModalEvents(modal);
    }
    
    return modal;
}

function initAstroModalEvents(modal) {
    const closeBtn = modal.querySelector('.astro-modal-close');
    
    closeBtn.addEventListener('click', () => closeAstroModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAstroModal(modal);
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex' && e.key === 'Escape') {
            closeAstroModal(modal);
        }
    });
}

function openAstroModal(modal, src, alt) {
    const image = modal.querySelector('.astro-modal-image');
    const loader = modal.querySelector('.astro-modal-loader');
    const title = modal.querySelector('.astro-modal-title');
    
    // Mostrar loader
    loader.style.display = 'flex';
    image.style.opacity = '0';
    
    // Cargar imagen
    const img = new Image();
    img.onload = () => {
        image.src = src;
        image.alt = alt;
        image.style.opacity = '1';
        loader.style.display = 'none';
        
        // Efecto de entrada
        modal.classList.add('active');
        modal.style.display = 'flex';
        
        document.body.style.overflow = 'hidden';
    };
    
    img.onerror = () => {
        loader.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Error al cargar la imagen</span>';
    };
    
    img.src = src;
    title.textContent = alt;
}

function closeAstroModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// ===== PARALLAX EN IMÁGENES =====
function initImageParallax() {
    const parallaxImages = document.querySelectorAll('[data-image-parallax]');
    
    if (parallaxImages.length === 0) return;
    
    let ticking = false;
    
    function updateImageParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxImages.forEach(img => {
            const speed = parseFloat(img.getAttribute('data-parallax-speed')) || 0.5;
            const direction = img.getAttribute('data-parallax-direction') || 'vertical';
            
            if (direction === 'vertical') {
                const translateY = -(scrolled * speed);
                img.style.transform = `translateY(${translateY}px)`;
            }
        });
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateImageParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    updateImageParallax();
}

// ===== EFECTOS DE CARGA DE IMÁGENES =====
function initImageLoadingEffects() {
    const images = document.querySelectorAll('img[data-lazy]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadLazyImage(img);
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // Mostrar placeholder
        img.style.background = 'linear-gradient(45deg, #4361ee, #3a0ca3)';
        img.style.minHeight = '200px';
        
        imageObserver.observe(img);
    });
}

function loadLazyImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    const loader = document.createElement('div');
    loader.className = 'image-loading';
    loader.innerHTML = '<div class="astro-spinner"></div>';
    img.parentNode.insertBefore(loader, img);
    
    const image = new Image();
    image.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        loader.remove();
        
        // Efecto de revelado
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 100);
    };
    
    image.onerror = () => {
        loader.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        setTimeout(() => loader.remove(), 2000);
    };
    
    image.src = src;
}

// ===== SISTEMA DE PARTÍCULAS =====
function initParticles() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 0.5 + 0.3;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#4361ee' : '#3a0ca3';
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            if (this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    function createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    createParticles();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== EFECTO DE ESCRITURA =====
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;
    
    // Verificar si ya tiene el efecto
    if (heroTitle.querySelector('.typing-container')) return;
    
    heroTitle.innerHTML = `
        <span class="typing-container">
            <span class="typing-text"></span>
            <span class="typing-cursor">|</span>
        </span>
    `;
    
    const typingText = heroTitle.querySelector('.typing-text');
    const typingCursor = heroTitle.querySelector('.typing-cursor');
    
    const phrases = [
        'Transformando la |educación| para el ~futuro~',
        'Innovando la |enseñanza| para el ~mañana~',
        'Revolucionando la |formación| del ~futuro~'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const rawPhrase = phrases[phraseIndex];
        
        if (!isDeleting) {
            // ESCRIBIENDO
            charIndex++;
            let tempText = rawPhrase.substring(0, charIndex);
            typingText.innerHTML = formatText(tempText);
            typingSpeed = 80;
            
            if (charIndex >= rawPhrase.length) {
                typingSpeed = 1500;
                isDeleting = true;
            }
        } else {
            // BORRANDO
            charIndex--;
            let tempText = rawPhrase.substring(0, charIndex);
            typingText.innerHTML = formatText(tempText);
            typingSpeed = 40;
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    function formatText(text) {
        let formatted = text.replace(/\|([^|]*)\|?/g, '<span class="keyword">$1</span>');
        formatted = formatted.replace(/~([^~]*)~?/g, '<span class="highlight">$1</span>');
        formatted = formatted.replace(/[\|~]/g, '');
        return formatted;
    }
    
    // Iniciar
    setTimeout(() => {
        typeWriter();
    }, 1000);
}

// ===== UTILIDADES GENERALES =====
function createScrollToTopButton() {
    if (document.getElementById('scroll-to-top')) return;
    
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    document.body.appendChild(scrollBtn);
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initAstroSounds() {
    // Sistema básico de sonidos (puedes expandirlo)
    console.log('🎵 Sistema de sonidos Astro listo');
}

function initPerformanceMonitor() {
    if (window.location.hostname === 'localhost') {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Página cargada en ${loadTime}ms`);
        });
    }
}

// ===== INICIALIZAR TODAS LAS FUNCIONALIDADES ASTRO =====
function initializeAstroFeatures() {
    console.log("🌟 Inicializando características Astro...");
    
    // Sistema de utilidades
    createScrollToTopButton();
    initSmoothScrolling();
    
    // Efectos visuales principales
    initTypingEffect();
    initParticles();
    
    // Efectos de scroll e imágenes
    initAstroScrollEffects();
    initAstroImageEffects();
    
    // Sistema de sonidos (opcional)
    initAstroSounds();
    
    // Performance monitoring
    initPerformanceMonitor();
    
    console.log("✅ Todas las características Astro inicializadas");
}

// ===== MANEJADOR DE ERRORES GLOBAL =====
window.addEventListener('error', (e) => {
    console.error('🌌 Error Astro:', e.error);
});

// ===== EXPORTAR PARA USO GLOBAL =====
window.Astro = {
    init: initializeAstroFeatures,
    theme: toggleTheme,
    config: ASTRO_CONFIG
};

console.log("🌠 Astro Framework cargado correctamente");
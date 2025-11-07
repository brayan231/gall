// ===== SCRIPT.JS COMPLETO Y UNIFICADO =====

// ===== Cargar Header y Footer =====
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado, iniciando aplicación...");
    
    // Determinar ruta base
    const getBasePath = () => {
        const path = window.location.pathname;
        if (path.includes('/pages/') || path.includes('/conocenos/') || path.includes('/programas/')) {
            return '../';
        }
        return './';
    };
    const basePath = getBasePath();

    // Cargar Header
    fetch(`${basePath}partials/header.html`)
        .then(res => {
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            return res.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById("header-placeholder");
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                setTimeout(() => {
                    initializeHeader();
                }, 100);
            }
        })
        .catch(err => {
            console.error("Error cargando header:", err);
        });
        
    // Cargar Footer
    fetch(`${basePath}partials/footer.html`)
        .then(res => {
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            return res.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById("footer-placeholder");
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(err => {
            console.error("Error cargando footer:", err);
        });

    // Inicializar todas las funcionalidades
    initializeAllFeatures();
});

// ===== INICIALIZAR TODAS LAS FUNCIONALIDADES =====
function initializeAllFeatures() {
    createScrollToTopButton();
    initProgramsCarousel();
    initSmoothScrolling();
    initGalleryModal();
    initScrollSpy();
    initProgramNavigation();
    initHeroCarousel();
    initTypingEffect();
    initParticles();
    
    // INICIALIZAR PÁGINAS ESPECÍFICAS
    initAboutPage();
    initMissionVisionPage();

    // Manejar clic en "Inicio" para scroll suave
    const inicioLink = document.getElementById("inicio-link");
    if (inicioLink) {
        inicioLink.addEventListener("click", function (e) {
            const isOnIndex =
                window.location.pathname.endsWith("index.html") ||
                window.location.pathname === "/" ||
                window.location.pathname.endsWith("/");

            if (isOnIndex) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }
}

// ===== INICIALIZAR HEADER =====
function initializeHeader() {
    console.log("Inicializando header...");
    
    const mobileToggle = document.querySelector('.mobile-toggle') || 
                        document.getElementById('mobile-toggle') || 
                        document.getElementById('mobileToggle');
    
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay') || createOverlay();

    console.log("Elementos encontrados:", { 
        mobileToggle: !!mobileToggle, 
        navMenu: !!navMenu, 
        overlay: !!overlay 
    });

    if (mobileToggle && navMenu) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // SIMPLIFICADO: Solo controlar overflow
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
            
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-bars' : 'fas fa-times';
            }
            
            console.log("Menú " + (isActive ? "cerrado" : "abierto"));
        };

        // Evento del botón hamburguesa
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Cerrar menú al hacer clic en overlay
        if (overlay) {
            overlay.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        }

        // Cerrar menú al hacer clic en enlaces principales
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown .nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Cerrar menú al hacer clic en enlaces del dropdown
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    setTimeout(() => toggleMenu(), 200);
                }
            });
        });

        // Cerrar menú al redimensionar a desktop
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    const icon = mobileToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }, 250);
        });

        console.log("Header inicializado correctamente");
    } else {
        console.error("Error: No se encontraron elementos del header");
    }

    initDropdowns();
    initHeaderScroll();
}

// ===== CREAR OVERLAY =====
function createOverlay() {
    let overlay = document.getElementById('overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    return overlay;
}

// ===== SCROLL DEL HEADER =====
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

        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        }
    }
}

// ===== DROPDOWNS =====
function initDropdowns() {
    console.log("Inicializando dropdowns...");
    
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const menu = item.querySelector('.dropdown-menu');
        
        if (!link || !menu) return;
        
        // DESKTOP - Hover
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                menu.classList.add('active');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                menu.classList.remove('active');
            }
        });
        
        // MOBILE - Click
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Cerrar otros dropdowns
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherMenu = otherItem.querySelector('.dropdown-menu');
                        const otherLink = otherItem.querySelector('.nav-link');
                        if (otherMenu) otherMenu.classList.remove('active');
                        if (otherLink) otherLink.classList.remove('active');
                    }
                });
                
                menu.classList.toggle('active');
                link.classList.toggle('active');
            }
        });
    });
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768 && !e.target.closest('.nav-item.dropdown')) {
            dropdownItems.forEach(item => {
                const menu = item.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('active');
            });
        }
    });
    
    console.log(`${dropdownItems.length} dropdowns inicializados`);
}

function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;
    
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
        'Innovando la |enseñanza| para el ~futuro~',
        'Revolucionando la |formación| para el ~futuro~',
        'Mejorando la |pedagogía| para el ~futuro~'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let cursorVisible = true;
    
    // Control manual del parpadeo del cursor
    function blinkCursor() {
        cursorVisible = !cursorVisible;
        typingCursor.style.opacity = cursorVisible ? '1' : '0';
    }
    
    // Iniciar parpadeo del cursor
    const cursorInterval = setInterval(blinkCursor, 500);
    
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
        if (text.includes('|') || text.includes('~')) {
            let formatted = text.replace(/\|([^|]*)\|?/g, function(match, word) {
                return '<span class="keyword">' + word + '</span>';
            });
            formatted = formatted.replace(/~([^~]*)~?/g, function(match, word) {
                return '<span class="highlight">' + word + '</span>';
            });
            formatted = formatted.replace(/[\|~]/g, '');
            return formatted;
        }
        return text;
    }
    
    // Iniciar
    setTimeout(() => {
        typeWriter();
    }, 1000);
    
    // Limpiar intervalo al salir
    window.addEventListener('beforeunload', () => {
        clearInterval(cursorInterval);
    });
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
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 4 + 2;
            this.speedY = Math.random() * 0.5 + 0.3;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#4361ee' : '#3a0ca3';
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            if (this.y > canvas.height) {
                this.reset();
            }
            
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
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
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
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
    
    window.addEventListener('resize', () => {
        createParticles();
    });
    
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
}

// ===== CARRUSEL HERO IMAGE =====
function initHeroCarousel() {
    const heroContainer = document.querySelector('.program-hero-image');
    if (!heroContainer) return;
    
    const existingSlides = heroContainer.querySelectorAll('.program-hero-img');
    if (existingSlides.length === 0) return;
    
    if (heroContainer.querySelector('.carousel-container')) {
        initCarouselFunctionality(heroContainer);
        return;
    }
    
    let slidesHTML = '';
    existingSlides.forEach((img, index) => {
        if (img.src) {
            slidesHTML += `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                    <img src="${img.src}" alt="${img.alt}" class="program-hero-img">
                </div>
            `;
        }
    });
    
    heroContainer.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-track">
                ${slidesHTML}
            </div>
            <div class="carousel-dots"></div>
        </div>
    `;

    initCarouselFunctionality(heroContainer);
}

function initCarouselFunctionality(heroContainer) {
    const track = heroContainer.querySelector('.carousel-track');
    const slides = heroContainer.querySelectorAll('.carousel-slide');
    const dotsContainer = heroContainer.querySelector('.carousel-dots');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;

    function createDots() {
        if (!dotsContainer || slides.length <= 1) return;
        
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        updateCarousel();
        updateDots();
        resetAutoPlay();
    }
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        const offset = slideWidth * currentIndex;
        
        track.style.transform = `translateX(-${offset}px)`;
        track.style.transition = 'transform 0.5s ease';
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }
    
    function startAutoPlay() {
        if (slides.length <= 1) return;
        
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        }, 5000);
    }
    
    function resetAutoPlay() {
        if (slides.length <= 1) return;
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
    
    createDots();
    updateCarousel();
    
    if (slides.length > 1) {
        startAutoPlay();
        
        heroContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        heroContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(autoPlayInterval);
            } else {
                startAutoPlay();
            }
        });
    }
}

// ===== CARRUSEL DE PROGRAMAS =====
function initProgramsCarousel() {
    const track = document.getElementById('programs-track');
    const slides = document.querySelectorAll('.program-slide');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTransform = 0;

    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir a programa ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        updateCarousel();
        updateDots();
    }
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 15;
        const offset = (slideWidth + gap) * currentIndex;
        
        track.style.transform = `translateX(-${offset}px)`;
        track.style.transition = 'transform 0.3s ease';
    }
    
    function handleStart(e) {
        isDragging = true;
        startX = e.touches ? e.touches[0].pageX : e.pageX;
        
        const transform = getComputedStyle(track).transform;
        if (transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            startTransform = matrix.m41;
        } else {
            startTransform = 0;
        }
        
        track.style.transition = 'none';
    }
    
    function handleMove(e) {
        if (!isDragging) return;
        
        currentX = e.touches ? e.touches[0].pageX : e.pageX;
        const diff = currentX - startX;
        
        track.style.transform = `translateX(${startTransform + diff}px)`;
    }
    
    function handleEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        track.style.transition = 'transform 0.3s ease';
        
        const diff = currentX - startX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else if (diff < 0 && currentIndex < slides.length - 1) {
                goToSlide(currentIndex + 1);
            } else {
                updateCarousel();
            }
        } else {
            updateCarousel();
        }
    }
    
    track.addEventListener('touchstart', handleStart, { passive: true });
    track.addEventListener('touchmove', handleMove, { passive: false });
    track.addEventListener('touchend', handleEnd);
    
    track.addEventListener('mousedown', handleStart);
    track.addEventListener('mousemove', handleMove);
    track.addEventListener('mouseup', handleEnd);
    track.addEventListener('mouseleave', handleEnd);
    
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    createDots();
    updateCarousel();
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    // Verificar si ya existe el botón
    if (document.getElementById('scroll-to-top')) return;
    
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                const navMenu = document.getElementById('nav-menu');
                const mobileToggle = document.querySelector('.mobile-toggle') || document.getElementById('mobile-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) {
                        const icon = mobileToggle.querySelector('i');
                        if (icon) icon.className = 'fas fa-bars';
                    }
                }
            }
        });
    });
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const programNavLinks = document.querySelectorAll('.program-nav-link');
    const sections = document.querySelectorAll('.program-section');
    
    if (programNavLinks.length === 0 || sections.length === 0) return;
    
    const offset = 180;

    function activateCurrentSection() {
        let current = '';
        const scrollPos = window.scrollY + offset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        programNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateCurrentSection);
    window.addEventListener('load', activateCurrentSection);
    window.addEventListener('resize', activateCurrentSection);
    
    setTimeout(activateCurrentSection, 100);
}

// ===== PROGRAM NAVIGATION =====
function initProgramNavigation() {
    const programNavLinks = document.querySelectorAll('.program-nav-link');
    
    if (programNavLinks.length === 0) return;
    
    const offset = 180;

    programNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            programNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ===== GALLERY MODAL =====
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');
    
    if (!galleryItems.length || !modal) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', imgAlt);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
    
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// ===== FUNCIONALIDADES ESPECÍFICAS PARA QUIÉNES SOMOS =====
function initAboutPage() {
    // Solo ejecutar en la página de Quiénes Somos
    if (!document.querySelector('.about-hero')) return;
    
    console.log("Inicializando página Quiénes Somos...");
    
    initializeAboutAnimations();
    initializeFloatingShapes();
    initializeParallax();
    initAboutHoverEffects();
    initAboutScrollToTop();
    initAboutHeroCarousel();
}

// Animaciones específicas para Quiénes Somos
function initializeAboutAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animación para stats
                if (entry.target.classList.contains('stats') || entry.target.classList.contains('about-hero')) {
                    animateAboutNumbers();
                }
                
                // Animación para timeline
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
                
                // Animación para value cards
                if (entry.target.classList.contains('value-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Animación para testimonios
                if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Animación para facility cards
                if (entry.target.classList.contains('facility-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observar elementos específicos de Quiénes Somos
    const aboutElements = [
        ...document.querySelectorAll('.stats, .about-hero'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.value-card'),
        ...document.querySelectorAll('.testimonial-card'),
        ...document.querySelectorAll('.facility-card')
    ];

    aboutElements.forEach(element => {
        // Establecer estado inicial
        if (element.classList.contains('timeline-item') || 
            element.classList.contains('value-card') || 
            element.classList.contains('testimonial-card') ||
            element.classList.contains('facility-card')) {
            element.style.opacity = '0';
            if (element.classList.contains('timeline-item')) {
                element.style.transform = 'translateX(-20px)';
            } else {
                element.style.transform = 'translateY(20px)';
            }
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(element);
    });
}

// Animación de números para Quiénes Somos
function animateAboutNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        let start = 0;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Formas flotantes para el hero de Quiénes Somos
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length === 0) return;
    
    shapes.forEach((shape, index) => {
        const duration = 3 + (index * 0.5);
        const delay = index * 0.2;
        
        shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    });
}

// Efecto parallax para Quiénes Somos
function initializeParallax() {
    const aboutHero = document.querySelector('.about-hero');
    if (!aboutHero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reducido para mejor rendimiento
        aboutHero.style.transform = `translateY(${rate}px)`;
    });
}

// Efectos hover específicos para Quiénes Somos
function initAboutHoverEffects() {
    const cards = document.querySelectorAll('.value-card, .facility-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Scroll to top específico para Quiénes Somos (si es necesario)
function initAboutScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CARRUSEL PARA HERO DE QUIÉNES SOMOS =====
function initAboutHeroCarousel() {
    const carouselContainer = document.querySelector('.about-hero-carousel .carousel-container');
    if (!carouselContainer) return;
    
    const track = carouselContainer.querySelector('.carousel-track');
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const dotsContainer = carouselContainer.querySelector('.carousel-dots');
    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;

    function createDots() {
        if (!dotsContainer || slides.length <= 1) return;
        
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        updateCarousel();
        updateDots();
        resetAutoPlay();
    }
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        const offset = slideWidth * currentIndex;
        
        track.style.transform = `translateX(-${offset}px)`;
        track.style.transition = 'transform 0.5s ease';
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }
    
    function startAutoPlay() {
        if (slides.length <= 1) return;
        
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        }, 5000);
    }
    
    function resetAutoPlay() {
        if (slides.length <= 1) return;
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        });
    }
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
    
    createDots();
    updateCarousel();
    
    if (slides.length > 1) {
        startAutoPlay();
        
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(autoPlayInterval);
            } else {
                startAutoPlay();
            }
        });
    }
}

// ===== FUNCIONALIDADES ESPECÍFICAS PARA MISIÓN Y VISIÓN =====
function initMissionVisionPage() {
    // Solo ejecutar en la página de Misión y Visión
    if (!document.querySelector('.mission-vision-hero')) return;
    
    console.log("Inicializando página Misión y Visión...");
    
    initMissionVisionAnimations();
    initValuesCarousel();
    initMissionVisionScrollEffects();
    initMissionVisionTyping();
}

// Animaciones específicas para Misión y Visión
function initMissionVisionAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar stats cuando sean visibles
                if (entry.target.classList.contains('stats') || 
                    entry.target.classList.contains('impact-cta')) {
                    animateMissionVisionCounters();
                }

                // Animar timeline progress
                if (entry.target.classList.contains('achievements-timeline')) {
                    const progress = entry.target.querySelector('.timeline-line-progress');
                    if (progress) {
                        setTimeout(() => {
                            progress.style.height = '100%';
                        }, 500);
                    }
                }
            }
        });
    }, observerOptions);

    // Observar elementos de timeline
    document.querySelectorAll('.achievement-item').forEach(item => {
        observer.observe(item);
    });

    // Observar secciones principales
    document.querySelectorAll('.stats, .impact-cta, .achievements-timeline, .objective-card, .main-card').forEach(section => {
        observer.observe(section);
    });
}

// Animación de contador para Misión y Visión
function animateMissionVisionCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Solo animar si el elemento es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Carousel de valores para Misión y Visión
let currentValueIndex = 0;
let autoPlayInterval;

function initValuesCarousel() {
    const valueSlides = document.querySelectorAll('.value-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (valueSlides.length === 0) return;

    function updateValueCarousel() {
        valueSlides.forEach((slide, index) => {
            slide.classList.remove('active');
            indicators[index].classList.remove('active');
            
            if (index === currentValueIndex) {
                slide.classList.add('active');
                indicators[index].classList.add('active');
            }
        });
    }

    window.changeValue = function(direction) {
        currentValueIndex += direction;
        if (currentValueIndex < 0) currentValueIndex = valueSlides.length - 1;
        if (currentValueIndex >= valueSlides.length) currentValueIndex = 0;
        updateValueCarousel();
        resetAutoPlay();
    }

    window.goToValue = function(index) {
        currentValueIndex = index;
        updateValueCarousel();
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            changeValue(1);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Auto-play del carousel
    startAutoPlay();

    // Pausar auto-play al interactuar
    const carouselContainer = document.querySelector('.values-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
}

// Efectos de scroll para Misión y Visión
function initMissionVisionScrollEffects() {
    // Efecto parallax en shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // Smooth scroll para el indicador
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.main-cards-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Animación de entrada para las cards principales
    const mainCards = document.querySelectorAll('.main-card');
    mainCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });

    // Hover effect en point items
    document.querySelectorAll('.point-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Timeline scroll progress
    window.addEventListener('scroll', () => {
        const timeline = document.querySelector('.achievements-timeline');
        if (!timeline) return;

        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
            const scrolled = Math.max(0, Math.min(1, (windowHeight - timelineRect.top) / timelineRect.height));
            const progressBar = document.querySelector('.timeline-line-progress');
            if (progressBar) {
                progressBar.style.height = (scrolled * 100) + '%';
            }
        }
    });
}

// Efecto de typing para Misión y Visión
function initMissionVisionTyping() {
    const heroTitle = document.querySelector('.mission-vision-hero .hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }
}

// ===== MANEJADOR DE ERRORES GLOBAL =====
window.addEventListener('error', function(e) {
    console.error('Error global capturado:', e.error);
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.initializeAllFeatures = initializeAllFeatures;
window.initAboutPage = initAboutPage;
window.initMissionVisionPage = initMissionVisionPage;
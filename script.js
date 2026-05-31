// ===== MOBILE NAVIGATION =====
function toggleNav() {
    const menu = document.getElementById('menu');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('navOverlay');
    
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeNav() {
    const menu = document.getElementById('menu');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('navOverlay');
    
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== TAB FUNCTIONALITY =====
function opentab(event, tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");
    
    // Remove active class from all tabs
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-link");
    }
    
    // Hide all tab contents
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].classList.remove("active-tab");
    }
    
    // Add active class to clicked tab
    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active-link");
    }
    
    // Show selected tab content
    document.getElementById(tabname).classList.add("active-tab");
}

// ===== SCROLL ANIMATIONS =====
function setupScrollReveals() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    document.body.classList.add('js-scroll-reveal');

    const revealTargets = [];
    const revealCheck = () => {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        revealTargets.forEach((element) => {
            if (element.classList.contains('is-visible')) return;

            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < viewportHeight * 0.88 && rect.bottom > 0;

            if (isVisible) {
                element.classList.add('is-visible');
            }
        });
    };

    const observer = 'IntersectionObserver' in window
        ? new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -6% 0px'
        })
        : null;

    const revealGroups = [
        { selector: '#about .section-header', baseClass: 'reveal-fade-up' },
        { selector: '#about .about-col-1', baseClass: 'reveal-slide-left' },
        { selector: '#about .about-col-2', baseClass: 'reveal-slide-right' },
        { selector: '#experience .section-header', baseClass: 'reveal-fade-up' },
        { selector: '#experience .experience-item', baseClass: 'reveal-experience', stagger: true, alternate: true },
        { selector: '#services .section-header', baseClass: 'reveal-fade-up' },
        { selector: '#services .service-card', baseClass: 'reveal-scale', stagger: true },
        { selector: '#services .services-cta-wrap', baseClass: 'reveal-fade-up' },
        { selector: '#reviews .section-header', baseClass: 'reveal-fade-up' },
        { selector: '#reviews .review-card', baseClass: 'reveal-pop', stagger: true },
        { selector: '#contact .section-header', baseClass: 'reveal-fade-up' },
        { selector: '#contact .contact-info', baseClass: 'reveal-slide-left' },
        { selector: '#contact .contact-form-wrapper', baseClass: 'reveal-slide-right' }
    ];

    revealGroups.forEach(({ selector, baseClass, stagger = false, alternate = false }) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
            element.classList.add('reveal-item', baseClass);
            revealTargets.push(element);

            if (stagger) {
                element.style.transitionDelay = `${index * 120}ms`;
            }

            if (alternate) {
                element.classList.add(index % 2 === 0 ? 'reveal-from-left' : 'reveal-from-right');
            }

            if (observer) {
                observer.observe(element);
            }
        });
    });

    revealCheck();

    if (!observer) {
        window.addEventListener('scroll', revealCheck, { passive: true });
        window.addEventListener('resize', revealCheck, { passive: true });
    } else {
        window.addEventListener('scroll', revealCheck, { passive: true });
        window.addEventListener('resize', revealCheck, { passive: true });
    }
}

// ===== HERO ANIMATION =====
function setupHeroAnimation() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const heroTargets = [
        '.badge',
        '.hero-title',
        '.hero-subtitle',
        '.typing-wrapper',
        '.cta-buttons',
        '.profile'
    ];

    const heroElements = [];

    heroTargets.forEach((selector) => {
        heroElements.push(...document.querySelectorAll(selector));
    });

    if (!heroElements.length) return;

    heroElements.forEach((element, index) => {
        if (element.dataset.heroAnimated === 'true') return;
        element.classList.add('hero-animate');
        element.style.setProperty('--hero-delay', `${index * 120}ms`);
        element.dataset.heroAnimated = 'true';
    });

    if (reduceMotion.matches) {
        document.body.classList.add('hero-ready');
        return;
    }

    // Force a DOM layout reflow so the browser registers the initial state (opacity 0)
    // before applying the .hero-ready class to animate
    document.body.offsetHeight;

    document.body.classList.add('hero-ready');
}

// ===== TYPING ANIMATION =====
function setupTypingAnimation() {
    const el = document.querySelector('.typing-text span');
    if (!el || el.dataset.typed === 'true') return;

    const words = [
        'Beautiful Interfaces.',
        'Scalable Web Apps.',
        'User-Centered Designs.'
    ];

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
        el.textContent = words[0];
        el.dataset.typed = 'true';
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pause = 1200;

    function tick() {
        const current = words[wordIndex];
        if (!deleting) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, pause);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(tick, 300);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    el.dataset.typed = 'true';
    tick();
}

// ===== UNIFIED PORTFOLIO INITIALIZATION =====
function initPortfolio() {
    // Prevent double execution
    if (window.portfolioInitialized) return;
    window.portfolioInitialized = true;

    try { setupScrollReveals(); } catch (e) { console.error('Scroll reveal init error:', e); }
    try { setupHeroAnimation(); } catch (e) { console.error('Hero animation init error:', e); }
    try { setupTypingAnimation(); } catch (e) { console.error('Typing animation init error:', e); }
    try { updateActiveNavLink(); } catch (e) { console.error('Active nav link init error:', e); }

    const navMenu = document.getElementById('menu');
    if (navMenu) {
        navMenu.addEventListener('click', (event) => {
            const navLink = event.target.closest('a[href^="#"]');
            if (!navLink) return;

            const targetId = navLink.getAttribute('href');
            if (!targetId || targetId === '#') return;

            event.preventDefault();
            closeNav();

            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Safely bootstrap the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}


// ===== ACTIVE NAVIGATION ON SCROLL =====
function updateActiveNavLink() {
    const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
    if (!navLinks.length) return;

    const linkedSections = navLinks
        .map((link) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return null;
            const section = document.querySelector(targetId);
            return section ? { link, section } : null;
        })
        .filter(Boolean);

    if (!linkedSections.length) return;

    // Use a point just below the fixed nav to determine the current section.
    const checkpoint = window.scrollY + 120;
    let activePair = linkedSections[0];

    linkedSections.forEach((pair) => {
        if (pair.section.offsetTop <= checkpoint) {
            activePair = pair;
        }
    });

    // Force last section active when at the bottom of the page.
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (nearBottom) {
        activePair = linkedSections[linkedSections.length - 1];
    }

    navLinks.forEach((link) => link.classList.remove('active'));
    activePair.link.classList.add('active');
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
window.addEventListener('resize', updateActiveNavLink);


// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.closest('#menu')) return;

        const targetId = this.getAttribute('href');

        // Only intercept on-page hash navigation.
        if (!targetId || !targetId.startsWith('#')) return;

        e.preventDefault();
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM VALIDATION & FEEDBACK =====
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.btn-submit');
        const statusEl = this.querySelector('.form-status');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        if (statusEl) {
            statusEl.className = 'form-status';
            statusEl.textContent = 'Sending your message...';
        }

        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                this.reset();
                if (statusEl) {
                    statusEl.className = 'form-status is-success';
                    statusEl.textContent = 'Thanks. Your message was sent successfully.';
                }
            } else {
                if (statusEl) {
                    statusEl.className = 'form-status is-error';
                    statusEl.textContent = 'Sorry, something went wrong. Please try again.';
                }
            }
        } catch (error) {
            if (statusEl) {
                statusEl.className = 'form-status is-error';
                statusEl.textContent = 'Network error. Please check your connection and retry.';
            }
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== TYPING ANIMATION ENHANCEMENT =====
// The typing animation is handled in CSS, but we can add extra control if needed
const typingElement = document.querySelector('.typing-text span');
if (typingElement) {
    const phrases = [
        "Beautiful Websites",
        "Powerful Applications",
        "Digital Solutions"
    ];
    let currentPhrase = 0;
    
    // This is now handled by CSS animation, but kept for reference
    // You can uncomment and modify if you want JS-based typing
    /*
    setInterval(() => {
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingElement.setAttribute('data-text', phrases[currentPhrase]);
    }, 3000);
    */
}

// ===== PREVENT DEFAULT BEHAVIOR FOR EMPTY LINKS =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

// ===== CURSOR EFFECTS (Optional Enhancement) =====
// Add custom cursor effect for modern feel
document.addEventListener('mousemove', (e) => {
    // This can be used to add custom cursor effects
    // Currently disabled to keep performance optimal
});

// ===== LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

window.addEventListener('pageshow', () => {
    setupHeroAnimation();
    setupTypingAnimation();
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations can be added here
    });
}, { passive: true });

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeNav();
    }
});

// Focus trap for mobile menu
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const menu = document.getElementById('menu');

if (menu) {
    const firstFocusableElement = menu.querySelectorAll(focusableElements)[0];
    const focusableContent = menu.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (!menu.classList.contains('active')) return;

        let isTabPressed = e.key === 'Tab';

        if (!isTabPressed) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
}

console.log('🚀 Portfolio loaded successfully!');


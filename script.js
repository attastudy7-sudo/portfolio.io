// ===== MOBILE NAVIGATION =====
const menu = document.getElementById('menu');
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('navOverlay');

function toggleNav() {
    const isActive = menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function closeNav() {
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
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
    event.currentTarget.classList.add("active-link");
    
    // Show selected tab content
    document.getElementById(tabname).classList.add("active-tab");
}

// ===== SCROLL ANIMATIONS =====
// Add fade-in animation when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, portfolio items, etc.
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const experienceGrid = document.querySelector('#experience .experience-grid');
    const desktopMedia = window.matchMedia('(min-width: 901px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (experienceGrid && desktopMedia.matches && !reduceMotion.matches) {
        let animationFrameId = null;
        let isPaused = false;
        let direction = 1;

        const autoScroll = () => {
            if (!isPaused) {
                experienceGrid.scrollLeft += 0.45 * direction;

                const maxScroll = experienceGrid.scrollWidth - experienceGrid.clientWidth;

                if (experienceGrid.scrollLeft >= maxScroll - 1) {
                    direction = -1;
                } else if (experienceGrid.scrollLeft <= 0) {
                    direction = 1;
                }
            }

            animationFrameId = window.requestAnimationFrame(autoScroll);
        };

        experienceGrid.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        experienceGrid.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        autoScroll();

        window.addEventListener('beforeunload', () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        });
    }

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
});

// ===== ACTIVE NAVIGATION ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    // Add shadow to nav on scroll
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

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
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // The form will submit normally to Formspree
        // You can add additional validation here if needed
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
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
    
    // Trigger any initial animations
    const heroElements = document.querySelectorAll('.header-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
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

/* ═══════════════════════════════════════════════
   SOLARD ENERGIA SOLAR — JavaScript
   ═══════════════════════════════════════════════ */

// ─── Vendedor Modal ───
const openVendedorModal = () => {
    const modal = document.getElementById('vendedorModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

const closeVendedorModal = () => {
    const modal = document.getElementById('vendedorModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Make functions global for HTML onclicks
window.openVendedorModal = openVendedorModal;
window.closeVendedorModal = closeVendedorModal;

document.addEventListener('DOMContentLoaded', () => {

    // Close modal on overlay click
    const modalOverlay = document.getElementById('vendedorModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeVendedorModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeVendedorModal();
    });

    // ─── Navbar Scroll Effect ───
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.pageYOffset > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─── Mobile Menu Toggle ───
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        const toggleMenu = (show) => {
            const isOpening = show !== undefined ? show : !navMenu.classList.contains('open');
            navToggle.classList.toggle('active', isOpening);
            navMenu.classList.toggle('open', isOpening);
            
            // Only toggle body scroll if modal is NOT open
            const modal = document.getElementById('vendedorModal');
            if (modal && !modal.classList.contains('active')) {
                document.body.style.overflow = isOpening ? 'hidden' : '';
            }
        };

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // ─── Active Nav Link on Scroll ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    // ─── Parallax on Mouse Move (desktop) ───
    const hero = document.querySelector('.hero');
    const heroBgImg = document.querySelector('.hero-bg-img');

    if (window.matchMedia('(min-width: 992px)').matches && hero && heroBgImg) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            requestAnimationFrame(() => {
                heroBgImg.style.transform = `scale(1.04) translate(${x * -8}px, ${y * -8}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            heroBgImg.style.transform = '';
        });
    }

    // ─── Counter Animation ───
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const stepTime = 2000 / 60;
                const increment = target / 60;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current) + '+';
                    }
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
});

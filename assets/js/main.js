(function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 0.85;
    }

    function checkReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('load', checkReveal);

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            checkReveal();
            updateActiveNav();
        });
    });

    window.addEventListener('resize', checkReveal);

    window.switchTab = function(tabId, btn) {
        const section = btn.closest('.tab-section');
        
        section.querySelectorAll('.tab-company-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        section.querySelectorAll('.tab-detail').forEach(d => d.classList.remove('active'));
        const target = section.querySelector('.tab-detail[data-tab="' + tabId + '"]');
        if (target) {
            target.classList.add('active');
        }
    };

    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = [];

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            const section = document.querySelector(href);
            if (section) {
                sections.push({ link, section });
            }
        }
    });
    
    function updateActiveNav() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.offsetHeight;

        let activeLink = null;

        if (scrollY + windowHeight >= docHeight - 10) {
            activeLink = sections[sections.length - 1]?.link;
        } else {
            sections.forEach(({ link, section }) => {
                const top = section.offsetTop - 100;
                const bottom = top + section.offsetHeight;

                if (scrollY >= top && scrollY < bottom) {
                    activeLink = link;
                }
            });
        }

        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateActiveNav();
})();

window.toggleSound = function(videoId, btn) {
    const video = document.getElementById(videoId);
    if (video.muted) {
        video.muted = false;
        btn.textContent = '🔊';
        btn.title = 'Выключить звук';
    } else {
        video.muted = true;
        btn.textContent = '🔇';
        btn.title = 'Включить звук';
    }
};
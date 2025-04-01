document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuButton && mobileNav) {
        mobileMenuButton.addEventListener('click', function () {
            mobileNav.classList.toggle('active');

            // Toggle hamburger animation
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Make logo link scroll to top
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active navigation link - Modified to maintain Experience when scrolling to top
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset
        
        // If we're at the very top (hero section), don't set any nav link as active
        if (scrollPosition < sections[0].offsetTop) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            return;
        }
        
        // Otherwise, set the active link based on which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initial call

    // Add animation class to the highlight when the page loads
    const highlight = document.getElementById('quality-highlight');
    if (highlight) {
        highlight.setAttribute('role', 'button');
        highlight.setAttribute('aria-label', 'Quality - hover to see effect');
        highlight.tabIndex = 0; // Make it keyboard focusable

        // Add keyboard support for the hover effect
        highlight.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                highlight.classList.toggle('hover-active');
            }
        });

        highlight.addEventListener('blur', function () {
            highlight.classList.remove('hover-active');
        });
    }

    // Make the entire contact card clickable
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        const link = card.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            const rel = link.getAttribute('rel');
            
            // Make the entire card clickable
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                if (target === '_blank') {
                    window.open(href, '_blank', rel);
                } else {
                    window.location.href = href;
                }
            });

            // Add hover effect to indicate it's clickable
            card.addEventListener('mouseenter', function() {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        }
    });

    // Add dark mode icons to toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        // Create sun icon for light mode
        const sunIcon = document.createElement('div');
        sunIcon.className = 'toggle-icon sun-icon';
        sunIcon.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
            </svg>
        `;

        // Create moon icon for dark mode
        const moonIcon = document.createElement('div');
        moonIcon.className = 'toggle-icon moon-icon';
        moonIcon.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
            </svg>
        `;

        // Insert icons into the toggle
        darkModeToggle.insertBefore(sunIcon, darkModeToggle.firstChild);
        darkModeToggle.appendChild(moonIcon);
    }

    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // First reset all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active', 'prev', 'next');
            testimonial.style.visibility = 'hidden';
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(100%)'; // Default off-screen position
        });

        // Set up previous testimonial (only one, not all before the current)
        const prevIndex = index > 0 ? index - 1 : testimonials.length - 1;
        testimonials[prevIndex].classList.add('prev');
        testimonials[prevIndex].style.visibility = 'visible';
        testimonials[prevIndex].style.transform = 'translateX(-100%)';
        console.log("Previous" , testimonials[prevIndex]);
        // Set up current testimonial
        testimonials[index].classList.add('active');
        testimonials[index].style.visibility = 'visible';
        testimonials[index].style.opacity = '1';
        testimonials[index].style.transform = 'translateX(0)';
        console.log("Current", testimonials[index]);

        // Set up next testimonial
        const nextIndex = index < testimonials.length - 1 ? index + 1 : 0;
        testimonials[nextIndex].classList.add('next');
        testimonials[nextIndex].style.visibility = 'visible';
        testimonials[nextIndex].style.transform = 'translateX(100%)';
        console.log("Next", testimonials[nextIndex]);

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentTestimonial = index;
    }

    // Initialize testimonials with a slight delay
    if (testimonials.length > 0) {
        setTimeout(() => {
            showTestimonial(0);
        }, 10);

        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', function () {
                let index = currentTestimonial - 1;
                if (index < 0) index = testimonials.length - 1;
                showTestimonial(index);
                console.log('Previous testimonial clicked', index);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function () {
                let index = currentTestimonial + 1;
                if (index >= testimonials.length) index = 0;
                showTestimonial(index);
                console.log('Next testimonial clicked', index);
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', function () {
                showTestimonial(i);
            });
        });
    }

    // Enhanced scroll animations with bidirectional support
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    // Track which elements have been animated
    const animatedElements = new Set();
    let lastScrollY = window.scrollY;

    const handleElementVisibility = (entries, observer) => {
        // Determine scroll direction
        const scrollingDown = window.scrollY >= lastScrollY;
        lastScrollY = window.scrollY;

        entries.forEach(entry => {
            const el = entry.target;

            if (entry.isIntersecting && !animatedElements.has(el)) {
                // Element is entering viewport
                if (el.classList.contains('skill-item')) {
                    // Staggered animation for skill items
                    const items = Array.from(document.querySelectorAll('.skill-item'));
                    const index = items.indexOf(el);

                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                        animatedElements.add(el);
                    }, index % 5 * 100); // Group by 5 for each category
                } else if (el.classList.contains('project-card') || el.classList.contains('leadership-card')) {
                    // Staggered animation for project and leadership cards
                    const className = el.classList.contains('project-card') ? '.project-card' : '.leadership-card';
                    const items = Array.from(document.querySelectorAll(className));
                    const index = items.indexOf(el);

                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                        animatedElements.add(el);
                    }, index * 150);
                } else {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    animatedElements.add(el);
                }
            } else if (!entry.isIntersecting && animatedElements.has(el)) {
                // Element is leaving viewport
                const rect = el.getBoundingClientRect();
                const isAboveViewport = rect.bottom < 0;
                const isBelowViewport = rect.top > window.innerHeight;

                // Only animate out if scrolling in the opposite direction of entry
                if ((scrollingDown && isAboveViewport) || (!scrollingDown && isBelowViewport)) {
                    el.style.opacity = '0';
                    el.style.transform = scrollingDown ? 'translateY(-30px)' : 'translateY(30px)';
                    animatedElements.delete(el);
                }
            }
        });
    };

    const observer = new IntersectionObserver(handleElementVisibility, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.skill-item, .experience-card, .skill-category, .education-card, .contact-card, .project-card, .leadership-card, .lang-cert-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Update animations on scroll
    window.addEventListener('scroll', () => {
        // Using requestAnimationFrame to limit execution for better performance
        requestAnimationFrame(() => {
            const scrollingDown = window.scrollY >= lastScrollY;
            lastScrollY = window.scrollY;
        });
    }, { passive: true });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const spans = mobileMenuButton.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }
            }
        });
    });

    // Dark Mode Toggle with fixed animation
    const toggleSwitch = document.getElementById('dark-mode-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Properly load the saved theme or use system preference
    function setThemePreference() {
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            toggleSwitch.checked = true;
        } else if (currentTheme === 'light') {
            document.documentElement.classList.remove('dark-mode');
            toggleSwitch.checked = false;
        } else if (prefersDarkScheme.matches) {
            // No saved preference, use system preference
            document.documentElement.classList.add('dark-mode');
            toggleSwitch.checked = true;
        }
    }

    // Initialize theme
    setThemePreference();

    // Handle dark mode toggle with fixed animation
    toggleSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }

        // Force repaint to ensure toggle animation works
        const toggle = document.querySelector('.dark-mode-toggle');
        toggle.style.display = 'none';
        setTimeout(() => toggle.style.display = 'flex', 5);
    });

    // Handle system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark-mode');
                toggleSwitch.checked = true;
            } else {
                document.documentElement.classList.remove('dark-mode');
                toggleSwitch.checked = false;
            }
        }
    });

});
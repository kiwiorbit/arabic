// Main JavaScript for Nur Al-Hikma Islamic Resources

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.querySelector('header');
    const body = document.body;

    // Sticky navbar effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('bg-dark/95');
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initialize on page load
    handleScroll();

    // Function to open mobile menu
    function openMobileMenu() {
        // Make sure the menu is in the DOM
        if (!mobileMenu) return;

        // Make it visible
        mobileMenu.classList.remove('hidden');

        // Prevent body scrolling when menu is open
        body.style.overflow = 'hidden';

        // Force a reflow to ensure transitions work
        window.getComputedStyle(mobileMenu).opacity;
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        // Make sure the menu is in the DOM
        if (!mobileMenu) return;

        // Add hidden class
        mobileMenu.classList.add('hidden');

        // Restore body scrolling
        body.style.overflow = '';
    }

    // Toggle mobile menu when hamburger icon is clicked
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            openMobileMenu();
        });
    }

    // Close mobile menu when X button is clicked
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close mobile menu when clicking on a menu item
    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Allow a small delay before closing to make the click feel more responsive
                setTimeout(closeMobileMenu, 150);
            });
        });
    }

    // Close mobile menu when pressing escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });

    // Smooth scrolling is now handled by Locomotive Scroll in the main HTML file
    // This is kept as a fallback for browsers that don't support Locomotive Scroll
    if (typeof LocomotiveScroll === 'undefined') {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });
    } else {
        // If using Locomotive Scroll, just handle closing the mobile menu
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function() {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }

    // Animation is now primarily handled by Locomotive Scroll
    // This is kept as a fallback for browsers that don't support Locomotive Scroll
    if (typeof LocomotiveScroll === 'undefined') {
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.animate-on-scroll');

            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementPosition < windowHeight - 100) {
                    element.classList.add('animate-fadeIn');
                }
            });
        };

        // Run animation check on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
    }
});

// Featured content carousel (if implemented)
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    if (!carousel || !carouselItems.length) return;

    let currentIndex = 0;

    // Show current slide
    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle('hidden', i !== index);
            item.setAttribute('aria-hidden', i !== index);
        });
    }

    // Initialize first slide
    showSlide(currentIndex);

    // Next slide
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        });
    }

    // Previous slide
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showSlide(currentIndex);
        });
    }

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }, 5000);
}

// Initialize carousel if present
document.addEventListener('DOMContentLoaded', initCarousel);

// Form validation for contact forms
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(event) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');

                // Add error message if not already present
                let errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
                    errorMessage.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.classList.remove('border-red-500');

                // Remove error message if present
                const errorMessage = field.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
}

// Initialize form validation for any contact forms
document.addEventListener('DOMContentLoaded', function() {
    validateForm('contact-form');
});

// Simple Book Animation Loader with 3-second duration

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const progress = document.getElementById('progress');
    const mainContent = document.getElementById('main-content');

    // Hide the main content initially
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.visibility = 'hidden';
    }

    // Fixed 3-second duration for the loader
    const totalDuration = 3000; // 3 seconds in milliseconds
    const startTime = Date.now();
    const endTime = startTime + totalDuration;

    // Update progress bar function
    function updateProgress() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const percentComplete = Math.min(100, (elapsedTime / totalDuration) * 100);

        // Update progress bar width
        progress.style.width = percentComplete + '%';

        if (currentTime < endTime) {
            // Continue updating if we haven't reached 3 seconds
            requestAnimationFrame(updateProgress);
        } else {
            // Exactly 3 seconds have passed
            progress.style.width = '100%';

            // Hide loader and show main content
            setTimeout(() => {
                loader.classList.add('hidden');

                if (mainContent) {
                    mainContent.style.opacity = '1';
                    mainContent.style.visibility = 'visible';
                }

                // Initialize Locomotive Scroll after content is visible
                initLocomotiveScroll();
            }, 100);
        }
    }

    // Start the progress update
    requestAnimationFrame(updateProgress);

    // If page is already loaded, still show loader for full 3 seconds
    window.addEventListener('load', function() {
        // Do nothing - we want the full 3 seconds regardless
    });
});

// Function to initialize Locomotive Scroll
function initLocomotiveScroll() {
    if (typeof LocomotiveScroll !== 'undefined') {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smoothMobile: true,
            multiplier: 1,
            lerp: 0.05,
            getDirection: true,
            reloadOnContextChange: true,
            touchMultiplier: 2,
            resetNativeScroll: true,
            smartphone: {
                smooth: true,
                breakpoint: 767
            },
            tablet: {
                smooth: true,
                breakpoint: 1024
            }
        });

        // Handle anchor links with smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        scroll.scrollTo(targetElement);
                    }
                }
            });
        });

        // Update scroll on window resize
        window.addEventListener('resize', () => {
            scroll.update();
        });
    }
}

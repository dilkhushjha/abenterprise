// Navbar



// End




document.addEventListener("DOMContentLoaded", function () {
    // Add the necessary CSS styles dynamically
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Animation base styles */
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s ease;
    }

    section.animate {
        opacity: 1;
        transform: translateY(0);
    }

    /* Timeline animations */
    .timeline-hidden {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s ease;
    }

    .timeline-inverted.timeline-hidden {
        transform: translateX(-50px);
    }

    .timeline li.timeline-animate {
        opacity: 1;
        transform: translateX(0);
    }

    /* Team member animations */
    .team-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .team-animate {
        opacity: 1;
        transform: translateY(0);
    }

    /* Value item animations */
    .value-hidden {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.5s ease;
    }

    .value-animate {
        opacity: 1;
        transform: scale(1);
    }

    /* Testimonial animations */
    .testimonial-hidden {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.7s ease;
    }

    .testimonial-animate {
        opacity: 1;
        transform: translateX(0);
    }

    /* Fade up animations */
    .fade-up {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-up.show {
        opacity: 1;
        transform: translateY(0);
    }
    `;
    document.head.appendChild(styleElement);

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const navlinks = document.querySelectorAll('.nav-link');

        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');

            // Add scroll class to nav links if they exist
            if (navlinks.length > 0) {
                navlinks.forEach((item) => {
                    item.classList.add('nav-link-scroll');
                });
            }
        } else {
            navbar.classList.remove('navbar-scrolled');

            // Remove scroll class from nav links if they exist
            if (navlinks.length > 0) {
                navlinks.forEach((item) => {
                    item.classList.remove('nav-link-scroll');
                });
            }
        }
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        let timeoutId;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.querySelector('.dropdown-menu').classList.remove('show');
                }
            });
            dropdown.querySelector('.dropdown-menu').classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                dropdown.querySelector('.dropdown-menu').classList.remove('show');
            }, 200); // 200ms delay before hiding
        });
    });

    // Animated counters for stats section
    const counterElements = document.querySelectorAll('.counter-number');

    const counterObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const countTo = parseInt(element.innerText);
                let count = 0;
                const duration = 15000; // 2 seconds (corrected from 20000)
                const interval = 10; // Update every 10ms
                const steps = duration / interval;
                const increment = countTo / steps;

                const counter = setInterval(() => {
                    count += increment;

                    if (count >= countTo) {
                        element.innerText = element.innerText.includes('+')
                            ? countTo.toLocaleString() + '+'
                            : countTo.toLocaleString();
                        clearInterval(counter);
                    } else {
                        element.innerText = Math.floor(count).toLocaleString() + (element.innerText.includes('+') ? '+' : '');
                    }
                }, interval);

                observer.unobserve(element);
            }
        });
    };

    const counterObserver = new IntersectionObserver(counterObserverCallback, {
        threshold: 0.5
    });

    counterElements.forEach(counter => {
        // Store original text for later
        counter.dataset.target = counter.innerText;
        counterObserver.observe(counter);
    });

    // Back to top button
    const backToTopButton = document.querySelector('.btn-primary.rounded-circle.position-fixed');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // Product hover effect
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.querySelector('img').style.transform = 'scale(1.1)';
        });

        item.addEventListener('mouseleave', function () {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add IntersectionObserver animations (from first file)
    if ('IntersectionObserver' in window) {
        // Section animations
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px"
        });

        sections.forEach(section => {
            section.classList.add('section-hidden');
            sectionObserver.observe(section);
        });

        // Timeline animations
        const timelineItems = document.querySelectorAll('.timeline > li');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-animate');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px"
        });

        timelineItems.forEach((item, index) => {
            item.classList.add('timeline-hidden');
            item.style.transitionDelay = `${index * 0.2}s`;
            timelineObserver.observe(item);
        });

        // Team member animations
        const teamMembers = document.querySelectorAll('.team-member');
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('team-animate');
                    teamObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px"
        });

        teamMembers.forEach((member, index) => {
            member.classList.add('team-hidden');
            member.style.transitionDelay = `${index * 0.2}s`;
            teamObserver.observe(member);
        });

        // Value item animations
        const valueItems = document.querySelectorAll('.value-item');
        const valueObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('value-animate');
                    valueObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px"
        });

        valueItems.forEach((item, index) => {
            item.classList.add('value-hidden');
            item.style.transitionDelay = `${index * 0.15}s`;
            valueObserver.observe(item);
        });

        // Testimonial animations
        const testimonials = document.querySelectorAll('.testimonial');
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('testimonial-animate');
                    testimonialObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px"
        });

        testimonials.forEach((testimonial, index) => {
            testimonial.classList.add('testimonial-hidden');
            testimonial.style.transitionDelay = `${index * 0.2}s`;
            testimonialObserver.observe(testimonial);
        });

        // Fade-in animations for sections (from second file)
        const fadeElements = document.querySelectorAll('.service-card, .product-item, .testimonial, h2, .lead');
        fadeElements.forEach(element => {
            element.classList.add('fade-up');
        });

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        console.log("IntersectionObserver not supported");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Add the necessary CSS styles dynamically for hover dropdowns
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* Remove dropdown arrows */
    .dropdown-toggle::after {
        display: none !important;
    }
    
    /* Add hover functionality for dropdowns */
    .dropdown:hover .dropdown-menu {
        display: block;
    }
    
    /* Add a small transition delay for smoother user experience */
    .dropdown-menu {
        margin-top: 0;
        transition: all 0.2s;
        display: none;
    }
    
    /* Optional styling for better dropdown appearance */
    .dropdown-menu {
        background-color:#fafafa;
        
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    `;
    document.head.appendChild(styleElement);

    // Optional: Add small delay to prevent menu flickering when moving mouse
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        let timeoutId;

        // Handle mouse entering dropdown
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);

            // Close other open dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown && d.querySelector('.dropdown-menu').classList.contains('show')) {
                    d.querySelector('.dropdown-menu').classList.remove('show');
                }
            });

            // Open this dropdown
            dropdown.querySelector('.dropdown-menu').classList.add('show');
        });

        // Handle mouse leaving dropdown with small delay
        dropdown.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                dropdown.querySelector('.dropdown-menu').classList.remove('show');
            }, 200); // 200ms delay before hiding
        });
    });

    // Remove Bootstrap's default dropdown toggle behavior
    const dropdownToggleLinks = document.querySelectorAll('.dropdown-toggle');
    dropdownToggleLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // If the dropdown toggle has an href that's not just "#", allow it to navigate
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.stopPropagation(); // Don't trigger Bootstrap dropdown
            } else {
                e.preventDefault(); // Prevent default # behavior
            }
        });
    });
});






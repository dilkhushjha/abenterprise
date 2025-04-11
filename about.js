
document.addEventListener("DOMContentLoaded", function () {
    // First, let's add the necessary CSS styles dynamically
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
    `;
    document.head.appendChild(styleElement);

    // Navbar scroll effect (keeping your existing code)
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Add animation classes to all sections
        const sections = document.querySelectorAll('section');

        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the section is in view
                if (entry.isIntersecting) {
                    // Add the animation class
                    entry.target.classList.add('animate');
                    // Only animate once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.15, // 15% of the item visible
            rootMargin: "0px"
        });

        // Observe all sections
        sections.forEach(section => {
            // Add the CSS class for pre-animation state
            section.classList.add('section-hidden');
            observer.observe(section);
        });

        // Add animations to timeline items
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
            // Delay each timeline item slightly for sequential animation
            item.style.transitionDelay = `${index * 0.2}s`;
            timelineObserver.observe(item);
        });

        // Add animations to team members
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
            // Delay each team member slightly for sequential animation
            member.style.transitionDelay = `${index * 0.2}s`;
            teamObserver.observe(member);
        });

        // Add animations to value items
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
            // Delay each value item slightly for sequential animation
            item.style.transitionDelay = `${index * 0.15}s`;
            valueObserver.observe(item);
        });

        // Add animations to testimonials
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
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Just show all elements without animation
        console.log("IntersectionObserver not supported");
    }
});

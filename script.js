// Function to initialize the website
(function () {
    // Loader timeout
    window.addEventListener("load", function () {
        const loader = document.querySelector(".loader");
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 1000);
    });

    // Slider functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
            dots[i].classList.remove('active');
        });
        dots[index].classList.add('active');
    }

    // Event delegation for dots
    document.querySelector('.slider-dots').addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('dot')) {
            const index = Array.from(dots).indexOf(target);
            showSlide(index);
            currentSlideIndex = index;
        }
    });

    // Back to top functionality
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Add icons to menu items
    const menuItems = [
        { text: 'About Us', icon: 'fas fa-info-circle' },
        { text: 'Events', icon: 'fas fa-calendar-alt' },
        { text: 'Community', icon: 'fas fa-users' },
        { text: 'Join Us', icon: 'fas fa-user-plus' },
        { text: 'FAQ', icon: 'fas fa-question-circle' }
    ];

    // Create menu items dynamically
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="${item.icon}"></i> <a href="#${item.text.replace(/\s+/g, '').toLowerCase()}">${item.text}</a>`;
        navMenu.appendChild(li);
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
        // Change hamburger color on click
        hamburger.style.color = navMenu.classList.contains('active') ? '#66ff91' : '#f4f4f4';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
            hamburger.style.color = '#f4f4f4'; // Reset color
        }
    });

    // Sticky header effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
})();

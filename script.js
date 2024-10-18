(function () {
    // Loader timeout
    window.addEventListener("load", function () {
        const loader = document.querySelector(".loader");
        setTimeout(() => {
            loader.classList.add("hidden");
            nextSlide();
            nextSlide();
            nextSlide();
        }, 1000);
    });

    // Slider functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active'); // Remove active class from all slides
            slide.style.transform = `translateX(-${index * 100}%)`; // Move slide into view
        });
        slides[index].classList.add('active'); // Add active class to the current slide for fade-in effect
        dots.forEach(dot => dot.classList.remove('active')); // Remove active class from all dots
        dots[index].classList.add('active'); // Add active class to the current dot
    }

    // Automatically change slides every 5 seconds
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length; // Update index to show next slide
        showSlide(currentSlideIndex);
    }

    // Declare slideInterval variable to allow restarting
    let slideInterval = setInterval(nextSlide, 5000); // Change slides every 5 seconds

    // Reset the auto slide interval
    function resetSlideInterval() {
        clearInterval(slideInterval); // Clear the previous interval
        slideInterval = setInterval(nextSlide, 5000); // Restart interval
    }

    // Event delegation for dots
    document.querySelector('.slider-dots').addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('dot')) {
            const index = Array.from(dots).indexOf(target);
            showSlide(index);
            currentSlideIndex = index;
            resetSlideInterval();  // Restart auto slide change after manual interaction
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

    // Change slide on button click
    document.querySelector('.prev').addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; // Go to previous slide
        showSlide(currentSlideIndex);
        resetSlideInterval(); // Restart interval
    });

    document.querySelector('.next').addEventListener('click', () => {
        nextSlide();
        resetSlideInterval(); // Restart interval
    });

    // Keyboard Navigation for the slider
    window.addEventListener('keydown', (event) => {
        if (event.key === "ArrowLeft") {
            // Show previous slide
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
            resetSlideInterval(); // Restart interval
        } else if (event.key === "ArrowRight") {
            // Show next slide
            nextSlide();
            resetSlideInterval(); // Restart interval
        }
    });

    // Pause the slider on mouse over
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseover', () => {
        clearInterval(slideInterval); // Pause auto slide on mouse over
    });

    sliderContainer.addEventListener('mouseout', () => {
        slideInterval = setInterval(nextSlide, 5000); // Resume auto slide on mouse out
    });
})();

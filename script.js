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

    // Ensure the first slide is shown initially
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active'); // Remove active class from all slides
            slide.style.transform = `translateX(-${index * 100}%)`; // Move slide into view
        });
        slides[index].classList.add('active'); // Add active class to the current slide for fade-in effect
        dots.forEach(dot => dot.classList.remove('active')); // Remove active class from all dots
        dots[index].classList.add('active'); // Add active class to the current dot
    }

    // Initialize the slider by showing the first slide
    showSlide(currentSlideIndex);

    // Automatically change slides every 5 seconds
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length; // Update index to show next slide
        showSlide(currentSlideIndex);
    }

    // Declare slideInterval variable to allow restarting
    let slideInterval = setInterval(nextSlide, 3000); // Change slides every 3 seconds

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
    const backToTopButton = document.getElementById('back-to-top');

    // Show the button when the user scrolls down
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = "block"; // Button visible
        } else {
            backToTopButton.style.display = "none"; // Button hidden
        }
    };

    // Scroll to the top when the button is clicked
    backToTopButton.onclick = function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scrolling
    };

    // Navigation
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.addEventListener("DOMContentLoaded", function () {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', function () {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Jeśli przewijasz w dół, chowa navbar
            if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
                navbar.classList.add('hide'); // Ukrywa nawigację
            } else {
                navbar.classList.remove('hide'); // Pokazuje nawigację
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Zapobiega negatywnym wartościom
        });
    });


    // Smooth scroll on anchor link click
    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const topPosition = targetElement.offsetTop - 100;  // Offset by 100px

                    window.scrollTo({
                        top: topPosition,
                        behavior: 'smooth'  // Smooth scrolling
                    });
                }
            });
        });
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
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
            resetSlideInterval(); // Restart interval
        } else if (event.key === "ArrowRight") {
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

    // Apply To Admin - Google Forms Modal
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Close Popup
    document.getElementById('close-btn').addEventListener('click', function () {
        document.getElementById('popup').style.display = 'none';
    });

})();

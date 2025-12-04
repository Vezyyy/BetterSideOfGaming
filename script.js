(function () {
    // Loader timeout
    window.addEventListener("load", function () {
        const loader = document.querySelector(".loader");
        setTimeout(() => {
            loader.classList.add("hidden");
            if (document.querySelector('.slider-container')) {
                nextSlide();
                nextSlide();
                nextSlide();
            }
        }, 1000);
    });

    // Slider functionality
    let currentSlideIndex = 4;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Only initialize slider if slides and dots exist
    if (slides.length > 0 && dots.length > 0) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.transform = `translateX(-${index * 100}%)`;
            });
            slides[index].classList.add('active');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        showSlide(currentSlideIndex);

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }

        let slideInterval = setInterval(nextSlide, 3000);

        function resetSlideInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        document.querySelector('.slider-dots').addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('dot')) {
                const index = Array.from(dots).indexOf(target);
                showSlide(index);
                currentSlideIndex = index;
                resetSlideInterval();
            }
        });

        document.querySelector('.prev').addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
            resetSlideInterval();
        });

        document.querySelector('.next').addEventListener('click', () => {
            nextSlide();
            resetSlideInterval();
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === "ArrowLeft") {
                currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
                showSlide(currentSlideIndex);
                resetSlideInterval();
            } else if (event.key === "ArrowRight") {
                nextSlide();
                resetSlideInterval();
            }
        });

        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseover', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseout', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Back to top functionality
    const backToTopButton = document.getElementById('back-to-top');
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.onclick = function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Navigation
    (function () {
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', function () {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
                navbar.classList.add('hide');
            } else {
                navbar.classList.remove('hide');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    })();

    // Smooth scroll on anchor link click
    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const topPosition = targetElement.offsetTop - 100;
                    window.scrollTo({ top: topPosition, behavior: 'smooth' });
                }
            });
        });
    });

    // Sticky header effect
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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

    // Scroll FAQ List
    function scrollFAQ(direction) {
        const faqList = document.querySelector(".faq-list");
        const scrollAmount = 400;
        faqList.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth"
        });
    }

    // Expand FAQ
    document.querySelectorAll(".faq-item").forEach(item => {
        item.addEventListener("click", function () {
            const text = this.querySelector(".faq-description").innerHTML;
            openPopup(text);
        });
    });


    function toggleDescription(event) {
        const faqItem = event.currentTarget;
        faqItem.classList.toggle('active');
    }


    // FAQ SECTION
    function toggleDescription(event) {
        const faqItem = event.currentTarget;
        faqItem.classList.toggle('active');
    }

    function scrollFAQ(direction) {
        const container = document.querySelector('.faq-list');
        container.scrollBy({
            left: direction * 300, 
            behavior: 'smooth'
        });
    }

    document.querySelector('.scroll-btn.left').addEventListener('click', () => {
        scrollFAQ(-1);
    });

    document.querySelector('.scroll-btn.right').addEventListener('click', () => {
        scrollFAQ(1);
    });

})();

let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    

    for (let j = 0; j < dots.length; j++) {
        dots[j].className = dots[j].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "flex";  
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000); // Zmień slajd co 5 sekund
}

document.getElementById('hamburger').onclick = function() {
    const navMenu = document.querySelector('nav ul');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
};

// Funkcja do zmiany slajdów na podstawie kliknięcia
function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

// Animacja ładowania
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

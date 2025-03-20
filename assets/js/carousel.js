document.addEventListener('DOMContentLoaded', function() {
    // Initialize the testimonials carousel
    initTestimoniosCarousel();
});

function initTestimoniosCarousel() {
    const carousel = document.querySelector('.testimonios-carousel');
    if (!carousel) return;
    
    const carouselInner = carousel.querySelector('.testimonios-carousel-inner');
    const slides = carousel.querySelectorAll('.testimonio-slide');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentIndex = 0;
    let slideInterval;
    const slideIntervalTime = 10000; // 10 seconds
    
    // Set up initial state
    updateCarouselState();
    
    // Start automatic sliding
    startSlideInterval();
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToPrevSlide();
            resetSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToNextSlide();
            resetSlideInterval();
        });
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarouselState();
            resetSlideInterval();
        });
    });
    
    // Pause automatic sliding when hovering over carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
    
    // Functions
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarouselState();
    }
    
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarouselState();
    }
    
    function updateCarouselState() {
        // Update slides position
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(goToNextSlide, slideIntervalTime);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
}
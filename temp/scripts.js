document.addEventListener('DOMContentLoaded', function () {
    let swiper = new Swiper(".mySwiper", {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination"
        },
        slidesPerView: 2
    });
});

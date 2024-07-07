// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// document.addEventListener('DOMContentLoaded', function () {
//     let swipers = document.querySelectorAll('.swiper');

//     swipers.forEach(async (el) => {
//         await sleep(Math.random() * 1000);
//         new Swiper(el, {
//             autoplay: {
//                 delay: 4000,
//                 disableOnInteraction: false
//             },
//             centeredSlides: true,
//             loop: true,
//             navigation: {
//                 nextEl: ".swiper-button-next",
//                 prevEl: ".swiper-button-prev"
//             },
//             pagination: {
//                 el: ".swiper-pagination"
//             },
//             slidesPerView: 2
//         });
//     });
// });

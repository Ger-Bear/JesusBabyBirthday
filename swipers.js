function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const range = (start, stop, step = 1) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const paritition = (arr, groupSize) => {
    return arr.map((_item, index) => index % groupSize === 0 ? arr.slice(index, index + groupSize) : null)
            .filter((item) => item !== null);
};

function shuffle(arr) {
    return arr
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
}

function createSwiper(pics, index) {
    // console.log(pics);

    let swiperContainer = document.createElement('div');
    swiperContainer.classList.add("swiper", `swiper-container-${index}`);

    let swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    
    pics.forEach((pic, i) => {
        let image = document.createElement('img')
        image.src = pic;

        let slide = document.createElement('div');
        slide.classList.add("swiper-slide", `slide-${i}`);
        slide.appendChild(image);

        swiperWrapper.appendChild(slide);
    });

    let swiperPagination = document.createElement('div');
    let nextButton = document.createElement('div');
    let prevButton = document.createElement('div');

    swiperPagination.classList.add("swiper-pagination");
    nextButton.classList.add("swiper-button-next");
    prevButton.classList.add("swiper-button-prev");

    swiperContainer.appendChild(swiperWrapper);
    swiperContainer.appendChild(swiperPagination);
    swiperContainer.appendChild(nextButton);
    swiperContainer.appendChild(prevButton);

    return swiperContainer;
}

document.addEventListener('DOMContentLoaded', function () {

        const pictures = shuffle(range(1, 79)).map((i) => `/Pictures/${i}.jpg`);
    // console.log('Pic', pictures);
    const pictureGroups = paritition(pictures, 10);

    let swipersArea = document.getElementById('swipers-area');

    pictureGroups.forEach((group, index) => {
        let swiper = createSwiper(group, index);
        swipersArea.appendChild(swiper);
    });

    let swipers = document.querySelectorAll('.swiper');

    swipers.forEach(async (el) => {
        await sleep(Math.random() * 1000);
        new Swiper(el, {
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
});

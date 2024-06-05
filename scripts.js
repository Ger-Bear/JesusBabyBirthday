document.addEventListener('DOMContentLoaded', () => {
    // JavaScript code to add interactive features can go here
    // Example: Adding smooth scroll for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const versePopup = document.getElementById('versePopup');
    const verseText = document.getElementById('verseText');

    async function fetchVerses() {
        const response = await fetch('verses.json');
        const verses = await response.json();
        return verses;
    }

    function showVerse(verses) {
        const randomIndex = Math.floor(Math.random() * verses.length);
        const verse = verses[randomIndex];
        verseText.textContent = `"${verse.text}" - ${verse.book} ${verse.chapter}:${verse.verse}`;
        versePopup.classList.add('show');

        setTimeout(() => {
            versePopup.classList.remove('show');
        }, 5000); // Display each verse for 5 seconds
    }

    fetchVerses().then(verses => {
        showVerse(verses);
        setInterval(() => showVerse(verses), 10000); // Change verse every 10 seconds
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Enable autoplay
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
});


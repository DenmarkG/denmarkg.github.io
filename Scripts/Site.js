async function loadHtmlFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const txt = await response.text();

        return txt;
    }
    catch (error) {
        console.error(error.message);
    }
}

function navSlide() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        // Lock scroll
        document.body.classList.toggle('lock');
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`
            }
        });

        // Burger Animation
        burger.classList.toggle('burger-toggle');
    });
}

async function loadHeader() {
    const kHeaderHtml = "/Components/Header.html";
    let txt = await loadHtmlFile(kHeaderHtml);

    let header = document.querySelector("#Header");
    header.innerHTML = txt;
}

async function initSite() {
    await loadHeader();
    navSlide();
}

initSite();
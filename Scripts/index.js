function navSlide()
{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => 
    {
        // Lock scroll
        document.body.classList.toggle('lock');
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => 
        {
            if (link.style.animation) 
            {
                link.style.animation = '';
            }
            else 
            {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`
            }
        });


        // Burger Animation
        burger.classList.toggle('burger-toggle');
    });
}

function init()
{
    navSlide();
}

init();
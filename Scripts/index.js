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

let modalText = "";
let shippedTitles = [];

function showModal(modal)
{
    // modal.classList.toggle('modal-visible');
    modal.style.display = "flex";
}

function hideModal(modal)
{
    modal.style.display = "none";
}

function initModal()
{
    const modal = document.querySelector('.modal');
    const cards = document.querySelectorAll('.card');

    modal.onclick = function()
    {
        hideModal(modal);
    };

    cards.forEach((card, index) => 
    {
        card.onclick = function()
        {
            let modalText = modal.querySelector('#modalText');
            modalText.innerHTML = shippedTitles[index].Title;
            showModal(modal);
        };
    });
}

async function loadData()
{
    const url = './Data/Shipped.json';
    try 
    {
        const response = await fetch(url);
        if (!response.ok) 
        {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        for (let i in json.titles) 
        {
            shippedTitles.push(json.titles[i]);
        } 
    } 
    catch (error) 
    {
        console.error(error.message);
    }
}

async function init()
{
    navSlide();
    await loadData();
    initModal();
}

init();
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

const modal = document.querySelector('.modal');
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
    modal.onclick = function()
    {
        hideModal(modal);
    };
}

async function loadJsonFile(url)
{
    try 
    {
        const response = await fetch(url);
        if (!response.ok) 
        {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        return json
    }
    catch (error) 
    {
        console.error(error.message);
    }
}

async function loadHtmlFile(url) 
{
    try 
    {
        const response = await fetch(url);
        if (!response.ok) 
        {
            throw new Error(`Response status: ${response.status}`);
        }

        const txt = await response.text();
        console.log(txt);

        return txt;
    }
    catch (error) 
    {
        console.error(error.message);
    }
}

function setupCardHtml(txt, cardData)
{
    let div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = txt;

    // The title image
    let img = div.querySelector("#cardImage");
    img.src = cardData.Img;

    // The title text
    let cardText = div.querySelector('#name');
    const br = "<br />";
    cardText.innerHTML = cardData.Name + br + cardData.Subtitle;

    // The overlay text
    let overlay = div.querySelector("#company");
    overlay.innerHTML = cardData.Company + br + cardData.Year;

    // Add the onclick
    div.onclick = function() 
    {
        let modalText = modal.querySelector('#modalText');

        let child = modalText.lastElementChild;
        while (child)
        {
            modalText.removeChild(child);
            child = modalText.lastElementChild;
        }

        modalText.innerHTML = cardData.Name;
        modalText.innerHTML += br;

        if (cardData.Media != null) 
        {
            console.log(cardData.Media);
            let media = document.createElement(cardData.Media.Type);
            for (let key in cardData.Media.Attributes)
            {
                media.setAttribute(key, cardData.Media.Attributes[key]);
            }
            
            modalText.appendChild(media);
        }
        
        showModal(modal);
    };

    return div;
}

async function loadData()
{
    const titleCardHtml = "./HTML/TitleCard.html";
    let txt = await loadHtmlFile(titleCardHtml);
    
    let titleCards = document.querySelector("#titles");
    const shippedTitlesJson = './Data/Shipped.json';
    let json = await loadJsonFile(shippedTitlesJson);
    for (let i in json.titles) 
    {
        shippedTitles.push(json.titles[i]);
        titleCards.appendChild(setupCardHtml(txt, shippedTitles[i]));
    }
}

async function init()
{
    navSlide();
    await loadData();
    initModal();
}

init();
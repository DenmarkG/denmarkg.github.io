const addEmbedMedia = true;
const kDataFolder = './Data/'

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

        return json
    }
    catch (error) 
    {
        console.error(error.message);
    }
}

// async function loadHtmlFile(url) 
// {
//     try 
//     {
//         const response = await fetch(url);
//         if (!response.ok) 
//         {
//             throw new Error(`Response status: ${response.status}`);
//         }

//         const txt = await response.text();

//         return txt;
//     }
//     catch (error) 
//     {
//         console.error(error.message);
//     }
// }

async function setupCardHtml(txt, cardData)
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


    // cardText.appendChild(header); 
    cardText.innerHTML = cardData.Name + br + cardData.Subtitle;

    // The overlay text
    let overlay = div.querySelector("#company");
    overlay.innerHTML = cardData.Company + br + cardData.Year;

    
    let mediaText = '';
    if ((addEmbedMedia == true) && (cardData.Media != null))
    {
        mediaText = await loadHtmlFile(kDataFolder + cardData.Media);
    }

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

        modalText.innerHTML = "";

        let header = document.createElement('h1');
        header.innerHTML = cardData.Name + br + cardData.Subtitle;

        modalText.appendChild(header);

        modalText.innerHTML += br;

        let description = document.createElement('h4');
        description.innerHTML = mediaText;
        modalText.appendChild(description);
        
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
        let card = await setupCardHtml(txt, shippedTitles[i]);
        titleCards.appendChild(card);
    }
}

async function init()
{
    await loadData();
    initModal();
}

init();
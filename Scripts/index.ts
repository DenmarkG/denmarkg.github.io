interface TitleCard {
    Name: string;
    Subtitle: string;
    Company: string;
    Year: number;
    Img: string;
    Media: string | null;
}

interface ShippedData {
    titles: TitleCard[];
}

const addEmbedMedia = true;
const kDataFolder = './Data/'

function navSlide(): void
{
    const burger = document.querySelector('.burger') as HTMLElement;
    const nav = document.querySelector('.nav-links') as HTMLElement;
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
            const el = link as HTMLElement;
            if (el.style.animation)
            {
                el.style.animation = '';
            }
            else
            {
                el.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`
            }
        });

        // Burger Animation
        burger.classList.toggle('burger-toggle');
    });
}

const modal = document.querySelector('.modal') as HTMLElement;
const shippedTitles: TitleCard[] = [];

function showModal(m: HTMLElement): void
{
    m.style.display = "flex";
}

function hideModal(m: HTMLElement): void
{
    m.style.display = "none";
}

function initModal(): void
{
    modal.onclick = function()
    {
        hideModal(modal);
    };
}

async function loadJsonFile(url: string): Promise<ShippedData>
{
    const response = await fetch(url);
    if (!response.ok)
    {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json() as ShippedData;
    console.log(json);

    return json;
}

async function loadHtmlFile(url: string): Promise<string>
{
    console.log('Loading file ' + url);
    const response = await fetch(url);
    if (!response.ok)
    {
        throw new Error(`Response status: ${response.status}`);
    }

    const txt = await response.text();
    console.log(txt);

    return txt;
}

async function setupCardHtml(txt: string, cardData: TitleCard): Promise<HTMLDivElement>
{
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = txt;

    // The title image
    const img = div.querySelector("#cardImage") as HTMLImageElement;
    img.src = cardData.Img;

    // The title text
    const cardText = div.querySelector('#name') as HTMLElement;
    const br = "<br />";

    cardText.innerHTML = cardData.Name + br + cardData.Subtitle;

    // The overlay text
    const overlay = div.querySelector("#company") as HTMLElement;
    overlay.innerHTML = cardData.Company + br + cardData.Year;

    let mediaText = '';
    if ((addEmbedMedia == true) && (cardData.Media != null))
    {
        mediaText = await loadHtmlFile(kDataFolder + cardData.Media);
    }

    // Add the onclick
    div.onclick = function()
    {
        const modalText = modal.querySelector('#modalText') as HTMLElement;

        let child = modalText.lastElementChild;
        while (child)
        {
            modalText.removeChild(child);
            child = modalText.lastElementChild;
        }

        modalText.innerHTML = "";

        const header = document.createElement('h1');
        header.innerHTML = cardData.Name + br + cardData.Subtitle;

        modalText.appendChild(header);

        modalText.innerHTML += br;

        const description = document.createElement('h4');
        description.innerHTML = mediaText;
        modalText.appendChild(description);

        showModal(modal);
    };

    return div;
}

async function loadData(): Promise<void>
{
    const titleCardHtml = "./HTML/TitleCard.html";
    const txt = await loadHtmlFile(titleCardHtml);

    const titleCards = document.querySelector("#titles") as HTMLElement;
    const shippedTitlesJson = './Data/Shipped.json';
    const json = await loadJsonFile(shippedTitlesJson);
    for (const i in json.titles)
    {
        shippedTitles.push(json.titles[i]);
        const card = await setupCardHtml(txt, shippedTitles[i]);
        titleCards.appendChild(card);
    }
}

async function init(): Promise<void>
{
    navSlide();
    await loadData();
    initModal();
}

init();

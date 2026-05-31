"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const addEmbedMedia = true;
const kDataFolder = './Data/';
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
            const el = link;
            if (el.style.animation) {
                el.style.animation = '';
            }
            else {
                el.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
            }
        });
        // Burger Animation
        burger.classList.toggle('burger-toggle');
    });
}
const modal = document.querySelector('.modal');
const shippedTitles = [];
function showModal(m) {
    m.style.display = "flex";
}
function hideModal(m) {
    m.style.display = "none";
}
function initModal() {
    modal.onclick = function () {
        hideModal(modal);
    };
}
function loadJsonFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = yield response.json();
        console.log(json);
        return json;
    });
}
function loadHtmlFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Loading file ' + url);
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const txt = yield response.text();
        console.log(txt);
        return txt;
    });
}
function setupCardHtml(txt, cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const div = document.createElement('div');
        div.classList.add("card");
        div.innerHTML = txt;
        // The title image
        const img = div.querySelector("#cardImage");
        img.src = cardData.Img;
        // The title text
        const cardText = div.querySelector('#name');
        const br = "<br />";
        cardText.innerHTML = cardData.Name + br + cardData.Subtitle;
        // The overlay text
        const overlay = div.querySelector("#company");
        overlay.innerHTML = cardData.Company + br + cardData.Year;
        let mediaText = '';
        if ((addEmbedMedia == true) && (cardData.Media != null)) {
            mediaText = yield loadHtmlFile(kDataFolder + cardData.Media);
        }
        // Add the onclick
        div.onclick = function () {
            const modalText = modal.querySelector('#modalText');
            let child = modalText.lastElementChild;
            while (child) {
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
    });
}
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const titleCardHtml = "./HTML/TitleCard.html";
        const txt = yield loadHtmlFile(titleCardHtml);
        const titleCards = document.querySelector("#titles");
        const shippedTitlesJson = './Data/Shipped.json';
        const json = yield loadJsonFile(shippedTitlesJson);
        for (const i in json.titles) {
            shippedTitles.push(json.titles[i]);
            const card = yield setupCardHtml(txt, shippedTitles[i]);
            titleCards.appendChild(card);
        }
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        navSlide();
        yield loadData();
        initModal();
    });
}
init();

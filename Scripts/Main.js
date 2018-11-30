console.log("Main.js loaded");

// function loadHeader()
// {
//     let headerParent = document.getElementById("header");

//     let header = document.createElement('object');
//     header.innerHTML = '<object type="text/html" data="HTML/Header.html" ></object>';
    
//     headerParent.appendChild(header);
//     console.log('header loaded' + header);
// }

var header;

$(document).ready(function()
{
    header = document.getElementById('header');
    
    $('#header').load('/HTML/Header.html');
    console.log('header loaded');
});

function adjustNavBarHeight(headerQuery)
{
    if (headerQuery.matches)
    {
        let bannerHeight = $('.header-image').height();
        let navBar = document.getElementById('nav-bar');
        navBar.style.classList.add('mobile-nav');
        navBar.style.marginTop = bannerHeight;
    }
    else
    {
        let navBar = document.getElementById('nav-bar');
        navBar.style.classList.remove('mobile-nav');
    }
}

var headerQuery = window.matchMedia("(orientation: landscape)");
$(document).ready(function()
{
    adjustNavBarHeight(headerQuery);
    headerQuery.addListener(adjustNavBarHeight);
});



window.onscroll = stickHeader();

function stickHeader()
{
    if (header == null)
    {
        header = document.getElementById('header');
    }
    
    let stickPos = header.offsetTop;

    if (window.pageYOffset > stickPos)
    {
        header.classList.add("fixed-header");
    }
    else
    {
        header.classList.remove("sticky-header");
    }
}
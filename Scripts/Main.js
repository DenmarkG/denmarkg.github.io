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
var navBar;

function adjustNavBarHeight(headerQuery)
{
    if (header !== undefined && header !== null)
    {
        if (headerQuery.matches)
        {
            let bannerHeight = $('.header-image').height();
            let navBar = header.childNodes[0];
            if (navBar !== undefined && navBar !== null)
            {
                navBar.style.classList.add('mobile-nav');
                navBar.style.marginTop = bannerHeight;
            }
        }
        else
        {
            let navBar = header.childNodes[0];
            if (navBar !== undefined && navBar !== null)
            {
                navBar.style.classList.remove('mobile-nav');
            }
        }
    }
}

var headerQuery;

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

function Init()
{
    // place the header
    header = document.getElementById('header');

    $('#header').load('/HTML/Header.html');
    console.log('header loaded');

    // make sure the navBar stay in place once it reaches the top
    window.onscroll = stickHeader();

    // Check for landscape or portrait
    // headerQuery = window.matchMedia("(orientation: landscape)");
    // $(adjustNavBarHeight(headerQuery));
    // headerQuery.addListener(adjustNavBarHeight);
}

$(document).ready(Init);
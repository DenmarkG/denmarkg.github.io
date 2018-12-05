console.log("Main.js loaded");

var loaded = false;

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

function stickNavBar()
{
    let nav = document.getElementById('nav');
    
    let stickPos = nav.offsetTop;

    if (window.pageYOffset > stickPos)
    {
        nav.classList.add('fixed-header');
        console.log('header stuck!');
    }
    else
    {
        nav.classList.remove('fixed-header');
        console.log('header unstuck!');
    }
}

function Init()
{
    // place the header
    header = document.getElementById('header');

    $('#header').load('/HTML/Header.html');
    console.log('header loaded');

    // make sure the navBar stay in place once it reaches the top
    window.onscroll = stickNavBar();

    // Check for landscape or portrait
    // headerQuery = window.matchMedia("(orientation: landscape)");
    // $(adjustNavBarHeight(headerQuery));
    // headerQuery.addListener(adjustNavBarHeight);

    loaded = true;
}

if (!loaded)
{
    $(document).ready(Init);    
}

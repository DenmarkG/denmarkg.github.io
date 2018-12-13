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

// function adjustNavBarHeight(headerQuery)
// {
//     if (header !== undefined && header !== null)
//     {
//         if (headerQuery.matches)
//         {
//             let bannerHeight = $('.header-image').height();
//             let navBar = header.childNodes[0];
//             if (navBar !== undefined && navBar !== null)
//             {
//                 navBar.style.classList.add('mobile-nav');
//                 navBar.style.marginTop = bannerHeight;
//             }
//         }
//         else
//         {
//             let navBar = header.childNodes[0];
//             if (navBar !== undefined && navBar !== null)
//             {
//                 navBar.style.classList.remove('mobile-nav');
//             }
//         }
//     }
// }

var headerQuery;

function stickNavBar()
{
    let nav = $('nav')[0];
    
    if (nav !== undefined && nav != null)
    {
        let stickPos = nav.offsetTop;

        if (window.pageYOffset > stickPos)
        {
            nav.addClass('fixed-header');
            console.log('header stuck!');
        }
        else
        {
            nav.removeClass('fixed-header');
            console.log('header unstuck!');
        }
    }
}

function expandInfo(event)
{
    console.log('clicked!');
    console.log(event);

    let coverImage = event.path[0];
    let moreText = coverImage.parentElement.querySelector('#read-more');

    if (moreText != undefined && moreText != null)
    {
        if (moreText.style.display === 'none')
        {
            moreText.style.display = 'inline';
        }
        else
        {
            moreText.style.display = 'none';
        }
    }

    // let moreText = $(this).getElementById('.read-more');
    // if (moreText[0] != undefined && moreText[0] != null)
    // {
    //     if (moreText[0].style.display === "none")
    //     {
    //         moreText[0].style.display = "inline";
    //     }
    //     else
    //     {
    //         moreText[0].style.display = "none";
    //     }
    // }
}

// find each read-more element and add this function to the image
// follow this example
// $( "li" ).addClass( "bar" );
// $("div").children(".selected").css("color", "blue");

function SetUpExpansions()
{
    // get each div that is a child of art-container
    let divs = $('.art-container').children('div');

    for (i = 0; i < divs.length; ++i)
    {
        console.log(divs[i]);

        // find the image
        let coverImage = divs.children('img');
        console.log(coverImage);

        // find the span
        let moreInfo = divs.children('#read-more');
        console.log(moreInfo);

        // add the onlick function to the image
        coverImage[0].addEventListener('click', expandInfo);
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

    // TODO: insert read-more stuff here
    SetUpExpansions();


    loaded = true;
}

if (!loaded)
{
    $(document).ready(Init);    
}

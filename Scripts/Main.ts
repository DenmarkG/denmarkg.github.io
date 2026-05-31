console.log("Main.js loaded");

let loaded = false;

let header: HTMLElement | null;
let navBar: HTMLElement | null;

let headerQuery: MediaQueryList;

function stickNavBar(): void
{
    const nav = $('nav')[0];

    if (nav !== undefined && nav != null)
    {
        const stickPos = nav.offsetTop;

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
}

function expandInfo(event: MouseEvent): void
{
    const path = event.composedPath();
    const coverImage = path[0] as HTMLElement;
    const moreText = coverImage.parentElement?.querySelector('.read-more') as HTMLElement | null;

    if (moreText != undefined && moreText != null)
    {
        const trailer = coverImage.parentElement?.querySelector('#trailer') as HTMLElement | null;

        if (moreText.style.display === 'none')
        {
            moreText.style.display = 'inline';
            console.log('text on');

            if (trailer != undefined && trailer != null)
            {
                trailer.style.display = 'inline';
                console.log('trailer on');
            }
        }
        else
        {
            moreText.style.display = 'none';

            if (trailer != undefined && trailer != null)
            {
                trailer.style.display = 'none';
                console.log('trailer off');
            }
        }
    }
}

function SetUpExpansions(): void
{
    // get each div that is a child of art-container
    const divs = $('.art-container').children('div');

    for (let i = 0; i < divs.length; ++i)
    {
        // find the image
        const coverImage = divs.children('img');
        const moreText = divs.find('.read-more');
        (moreText[i] as HTMLElement).style.display = 'none';

        // add the onclick function to the image
        coverImage[i].addEventListener('click', expandInfo);
    }
}

function Init(): void
{
    // place the header
    header = document.getElementById('header');

    console.log('header loaded');

    // make sure the navBar stays in place once it reaches the top
    $(window)[0].addEventListener('scroll', stickNavBar);

    // TODO: insert read-more stuff here
    SetUpExpansions();

    loaded = true;
}

if (!loaded)
{
    $(document).ready(Init);
}

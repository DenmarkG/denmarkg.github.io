console.log("Main.js loaded");

// function loadHeader()
// {
//     let headerParent = document.getElementById("header");

//     let header = document.createElement('object');
//     header.innerHTML = '<object type="text/html" data="HTML/Header.html" ></object>';
    
//     headerParent.appendChild(header);
//     console.log('header loaded' + header);
// }

$(document).ready(function()
{
    let header = document.getElementById('header');
    
    $('#header').load('/HTML/Header.html');
    console.log('header loaded');
});
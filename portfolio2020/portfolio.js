var menuContent = [{
        label: 'home',
        link: 'index.html',
        dropdown: false
    },
    {
        label: 'about',
        link: 'about.html',
        dropdown: false
    },
    {
        label: 'experience',
        link: 'experience',
        dropdown: true,
        submenu: [{
                label: 'paidia studio',
                link: 'paidia.html'
            },
            {
                label: 'nokia technologies',
                link: 'nokia.html'
            },
            {
                label: 'intuit',
                link: 'intuit.html'
            },
            {
                label: 'payjoy',
                link: 'payjoy.html'
            }
        ]
    },
    {
        label: 'resume',
        link: 'resume.html',
        dropdown: false
    },
    {
        label: 'contact',
        link: 'contact.html',
        dropdown: false
    }
];

var mobileMenu = $('<span></span>');
var desktopMenu = $('<span></span>');

var $header = $('<div class="row no-gutters header"> <div class="header-container"> <a class="col-3 col-lg-2 col-xl-1 logo" href="index.html"></a> <div class="col-9 col-lg-10 col-xl-11"> <div class="menu desktop"> </div> <div class="menu mobile"> <a href="javascript:void(0);" class="icon" onclick="toggleMenu()"> <i class="fa fa-bars"></i> </a> </div> </div> </div> </div> <div id="menuLinks"> </div>');

$(document).ready(function() {
    $('.anim1').delay(0).fadeIn(1200);
    $('.anim2').delay(1200).fadeIn(1200);
    $('.anim3').delay(2400).fadeIn(1200);
    $('.anim4').delay(2800).fadeIn(1200);
    $('.anim5').delay(3200).fadeIn(1200);
    $('.anim6').delay(3600).fadeIn(1200);
    $('.anim7').delay(4000).fadeIn(1200);
    $('.anim8').delay(4400).fadeIn(1200);
    $('.anim9').delay(4800).fadeIn(1200);
    $('.anim10').delay(5200).fadeIn(1200);
    $('.anim11').delay(5600).fadeIn(1200);
    $('.anim12').delay(6000).fadeIn(1200);
    $('.anim13').delay(6400).fadeIn(1200);

    // $('.link').click(function(event) {
    //   event.preventDefault();
    //   newLocation = this.href;
    //   $('body').fadeOut(250, newpage);
    // });

    $header.appendTo('.container-fluid');

    for (item in menuContent) {
        if (menuContent[item].dropdown) {
            mobileDropdown = getDropdownContent(menuContent[item].link, menuContent[item].submenu);
            mobileDropdown.appendTo(mobileMenu);
            desktopDropdown = getDropdownContent(menuContent[item].link, menuContent[item].submenu);
            desktopDropdown.appendTo(desktopMenu);
        } else {
            var mobileItem = $('<a href="' + menuContent[item].link + '">' + menuContent[item].label + '</a>');
            mobileItem.appendTo(mobileMenu);
            var desktopItem = $('<a href="' + menuContent[item].link + '">' + menuContent[item].label + '</a>');
            desktopItem.appendTo(desktopMenu);
        }
    }

    mobileMenu.appendTo('#menuLinks');
    desktopMenu.appendTo('.menu.desktop');

    var url = window.location.href;
    var desktop = $('.menu a').filter(function() {
        return this.href == url
    }).addClass('active');
    var mobile = $('#menuLinks a').filter(function() {
        return this.href == url
    }).addClass('active');
});

function getDropdownContent(label, items) {
    var dropdownMenu = $('<div class="dropdown"><button class="dropbtn">' + label + '&nbsp;&nbsp;<i class="fa fa-caret-down"></i></button></div>');
    var dropdownContent = $('<div id="desktopDropdown" class="dropdown-content"></div>');
    for (subItem = 0; subItem < items.length; subItem++) {
        var submenuItem = $('<a href="' + items[subItem].link + '">' + items[subItem].label + '</a>');
        submenuItem.appendTo(dropdownContent);
    }
    dropdownContent.appendTo(dropdownMenu);
    return dropdownMenu;
}

function toggleMenu() {
    var x = document.getElementById("menuLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function goToPage(page) {
    window.location = page;
}
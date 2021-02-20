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
                label: 'payjoy',
                link: 'payjoy.html'
            },
            {
                label: 'intuit',
                link: 'intuit.html'
            },
            {
                label: 'nokia technologies',
                link: 'nokia.html'
            },
            {
                label: 'work studies',
                link: 'workstudies.html'
            }
        ]
    },
    {
        label: 'projects',
        link: 'projects',
        dropdown: true,
        submenu: [{
                label: 'radical healing app',
                link: 'capstone.html'
            },
            {
                label: 'aevph (virtual puzzle hunt)',
                link: 'aevph.html'
            },
            {
                label: 'freelance design work',
                link: 'design.html'
            },
            {
                label: 'digital art',
                link: 'art.html'
            }
        ]
    },
    {
        label: 'leadership',
        link: 'leadership.html',
        dropdown: false
    },
    // {
    //     label: 'resume',
    //     link: 'resume.html',
    //     dropdown: false
    // },
    {
        label: 'contact',
        link: 'contact.html',
        dropdown: false
    }
];

var mobileMenu = $('<span></span>');
var desktopMenu = $('<span></span>');

var $header = $('<div class="row no-gutters header"> <div class="header-container"> <a class="col-2 col-xl-1 logo" href="index.html"></a> <div class="col-10 col-xl-11"> <div class="menu desktop"> </div> <div class="menu mobile"> <a href="javascript:void(0);" class="icon" onclick="toggleMenu()"> <i class="fa fa-bars"></i> </a> </div> </div> </div> </div> <div id="menuLinks"> </div>');

var $footer = $('<div id="footer"><div id="contact-bar"><div id="social-media"><div class="sm-icon"><a href="mailto:anuar.a@northeastern.edu"><i class="fa fa-envelope"></i></a></div><div class="sm-icon"><a href="https://www.linkedin.com/in/anisaanuar/" target="blank"><i class="fab fa-linkedin"></i></a></div><div class="sm-icon"><a href="https://www.facebook.com/iamnees" target="blank"><i class="fab fa-facebook"></i></a></div><div class="sm-icon"><a href="https://instagram.com/chocolatechipsmiles/" target="blank"><i class="fab fa-instagram"></i></a></div><div class="sm-icon"><a href="resume.pdf" target="blank"><i class="fa fa-link"></i></a></div></div></div><p>ANISA ANUAR</p></div>')

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
    $footer.appendTo('body');

    // Puts together menu from dictionary

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


    // Setting active menu page

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
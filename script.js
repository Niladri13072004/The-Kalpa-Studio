// Effect: Prepares the custom cursor and blur elements for motion.
// These variables are used by the mouse-follow interaction below.
var cursor = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

let cursorX = 0, cursorY = 0;
let isMoving = false;

// Effect: Tracks mouse movement and updates the custom cursor smoothly.
// This starts the animation frame loop only when the cursor is moving.
document.addEventListener("mousemove", function (e) {
    cursorX = e.clientX;
    cursorY = e.clientY;

    if (!isMoving) {
        requestAnimationFrame(updateCursorPosition);
        isMoving = true;
    }
});

// Effect: Moves the cursor dot and blur glow to the latest mouse position.
// This keeps both cursor layers synced with the pointer location.
function updateCursorPosition() {
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    blur.style.left = (cursorX - 250) + "px";
    blur.style.top = (cursorY - 250) + "px";
    isMoving = false;
}

// Effect: Enlarges the custom cursor when navbar items are hovered.
// This gives the navigation links a more interactive hover response.
var h4 = document.querySelectorAll("#navbar .nav-links a");
h4.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        cursor.style.scale = 1.3;
        cursor.classList.add("cursor-card-hover");
    });
    elem.addEventListener("mouseleave", function () {
        cursor.style.scale = 1;
        cursor.classList.remove("cursor-card-hover");
    });
});

// Effect: Adds a "hovered" class to navbar links when the mouse enters.
// This class is used by the CSS to trigger the text reveal animation.
var navLinks = document.querySelectorAll("#navbar .nav-links a");
navLinks.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        elem.classList.add("hovered");
    });
    elem.addEventListener("mouseleave", function () {
        elem.classList.remove("hovered");
    });
});

// Logo Cursor Effect
var logo = document.querySelector("#navbar .logo");
if (logo) {
    logo.addEventListener("mouseenter", function () {
        cursor.classList.add("cursor-difference");
        blur.style.opacity = 0;
    });
    logo.addEventListener("mouseleave", function () {
        cursor.classList.remove("cursor-difference");
        blur.style.opacity = 1;
    });
}

var playBtn = document.querySelector(".play-btn");
var heroVideo = document.querySelector(".video-1");

// Hero Video: Play button effect
heroVideo.addEventListener("mouseenter", function () {
    playBtn.style.opacity = 1;
    playBtn.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.opacity = 0; // Hide the main custom cursor dot
    blur.style.opacity = 0; // Hide the cursor blur
});

heroVideo.addEventListener("mouseleave", function () {
    playBtn.style.opacity = 0;
    playBtn.style.transform = "translate(-50%, -50%) scale(0)";
    cursor.style.opacity = 1; // Restore the main custom cursor dot
    blur.style.opacity = 1; // Restore the cursor blur
});

// Effect: Toggle video sound on click
heroVideo.addEventListener("click", function () {
    var videoElem = heroVideo.querySelector("video");
    videoElem.muted = !videoElem.muted;
});

heroVideo.addEventListener("mousemove", function (e) {
    playBtn.style.left = e.clientX + "px";
    playBtn.style.top = e.clientY + "px";
});

// Page 2 Video: Expansion effect + No blur
var video2Container = document.querySelector("#page-2 .left");
video2Container.addEventListener("mouseenter", function () {
    cursor.style.scale = 1.3;
    cursor.classList.add("cursor-card-hover");
    blur.style.opacity = 0;
});

video2Container.addEventListener("mouseleave", function () {
    cursor.style.scale = 1;
    cursor.classList.remove("cursor-card-hover");
    blur.style.opacity = 1;
});

video2Container.addEventListener("click", function () {
    var videoElem = video2Container.querySelector("video");
    videoElem.muted = !videoElem.muted;
});
// Effect: Hide navbar on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // Scrolling down & past the very top
        navbar.classList.add("nav-hidden");
    } else {
        // Scrolling up
        navbar.classList.remove("nav-hidden");
    }
    lastScrollY = window.scrollY;
});



// --- Pure Vanilla JS Media Circle ---
var mediaCircle = document.querySelector("#media-circle");
var h1s = document.querySelectorAll(".outline-h1");
var videos = document.querySelectorAll("#media-circle video");
var mainContainer = document.querySelector(".main-h1s");

let mcTargetX = 0, mcTargetY = 0;
let mcCurrentX = -500, mcCurrentY = -500;

document.addEventListener("mousemove", function(e) {
    mcTargetX = e.clientX;
    mcTargetY = e.clientY;
});

function animateMediaCircle() {
    mcCurrentX += (mcTargetX - mcCurrentX) * 0.15;
    mcCurrentY += (mcTargetY - mcCurrentY) * 0.15;
    
    if(mediaCircle) {
        mediaCircle.style.left = mcCurrentX + "px";
        mediaCircle.style.top = mcCurrentY + "px";
    }
    requestAnimationFrame(animateMediaCircle);
}
// Start tracking loop perfectly centered
animateMediaCircle();

if(mainContainer && mediaCircle) {
    mainContainer.addEventListener("mouseenter", function() {
        cursor.style.opacity = "0";
        blur.style.opacity = "0";
        mediaCircle.classList.add("active");
    });

    mainContainer.addEventListener("mouseleave", function() {
        cursor.style.opacity = "1";
        blur.style.opacity = "1";
        mediaCircle.classList.remove("active");
        
        videos.forEach(function(v) {
            v.classList.remove("active-vid");
        });
    });
}

h1s.forEach(function(h1, index) {
    h1.addEventListener("mouseenter", function() {
        videos.forEach(function(v) {
            v.classList.remove("active-vid");
            v.style.zIndex = "1";
        });
        
        if(videos[index]) {
            videos[index].classList.add("active-vid");
            videos[index].style.zIndex = "2";
            videos[index].currentTime = 0; 
            var playPromise = videos[index].play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) { console.log("Autoplay prevented."); });
            }
        }
    });
});


// -------------------------------------------

const elems    = document.querySelectorAll('#elem1');
const imgs     = document.querySelectorAll('.project-img');
const overlay  = document.querySelector('.wave-overlay');

// One colour per project — swap these to match your brand
const waveColors = ['rgb(217, 155, 82)', 'rgb(51, 55, 59)', 'rgb(214, 109, 88)', 'rgb(168, 142, 109)', 'rgb(208, 209, 219)'];

let currentIndex = 0;
let isAnimating  = false;

function transitionTo(newIndex) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    overlay.style.background = waveColors[newIndex];

    gsap.timeline({ onComplete: () => { isAnimating = false; } })

        // 1. Wave rises from bottom → covers the panel
        .to(overlay, {
            y: '0%',
            duration: 0.55,
            ease: 'power2.inOut'
        })

        // 2. Swap image while hidden behind the wave
        .call(() => {
            imgs[currentIndex].classList.remove('active');
            imgs[newIndex].classList.add('active');
            currentIndex = newIndex;
        })

        // 3. Wave exits upward → reveals the new image
        .to(overlay, {
            y: '-110%',
            duration: 0.55,
            ease: 'power2.inOut'
        })

        // 4. Snap back below for the next transition
        .set(overlay, { y: '110%' });
}

// Fire when a project description hits ~50% visibility in the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(elems).indexOf(entry.target);
            transitionTo(index);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '-5% 0px -5% 0px'
});

elems.forEach(elem => observer.observe(elem));

// Hover effect for project images
const projectRight = document.querySelector('#project-right');
if (projectRight) {
    projectRight.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-explore');
        cursor.setAttribute('data-text', 'Explore');
        blur.style.opacity = '0';
    });

    projectRight.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-explore');
        cursor.removeAttribute('data-text');
        blur.style.opacity = '1';
    });
}

const exploreCards = document.querySelectorAll('.elem2');
exploreCards.forEach(function (card) {
    card.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-explore');
        cursor.setAttribute('data-text', 'Explore');
        blur.style.opacity = '0';
    });

    card.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-explore');
        cursor.removeAttribute('data-text');
        blur.style.opacity = '1';
    });
});
// White bordered circle cursor on card hover
// var cards = document.querySelectorAll('.elem2');
// cards.forEach(function (card) {
//     card.addEventListener('mouseenter', function () {
//         cursor.classList.add('cursor-card-hover');
//         blur.style.opacity = '0';
//     });
//     card.addEventListener('mouseleave', function () {
//         cursor.classList.remove('cursor-card-hover');
//         blur.style.opacity = '1';
//     });
// });

var cards = document.querySelectorAll(".elem2");
cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
        requestAnimationFrame(() => {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -15;
            var rotateY = ((x - centerX) / centerX) * 15;
            card.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.05)";
        });
    });

    card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05)";
    });
});

var footerPills = document.querySelectorAll(".footer-pill");
footerPills.forEach(function (pill) {
    pill.addEventListener("mouseenter", function () {
        pill.classList.add("hovered-pill");
        cursor.classList.add("cursor-card-hover"); // Expand custom cursor
        blur.style.opacity = 0; // Hide blur glow
    });
    pill.addEventListener("mouseleave", function () {
        pill.classList.remove("hovered-pill");
        cursor.classList.remove("cursor-card-hover"); // Shrink custom cursor back
        blur.style.opacity = 1; // Restore blur glow
    });
});

// Floating contact button cursor interaction
var floatingBtn = document.querySelector("#floating-contact-btn");
if (floatingBtn) {
    floatingBtn.addEventListener("mouseenter", function () {
        cursor.classList.add("cursor-card-hover");
        blur.style.opacity = 0;
    });
    floatingBtn.addEventListener("mouseleave", function () {
        cursor.classList.remove("cursor-card-hover");
        blur.style.opacity = 1;
    });
}

// Mobile Menu Toggle Logic
var menuIcon = document.querySelector("#menu-icon");
var fullMenu = document.querySelector("#full-menu");
var menuClose = document.querySelector("#menu-close");
var menuLinks = document.querySelectorAll("#full-menu .menu-links a");

if (menuIcon && fullMenu) {
    menuIcon.addEventListener("click", function () {
        menuIcon.classList.toggle("active");
        fullMenu.classList.toggle("active");
        
        // Disable body scroll when menu is open
        if (fullMenu.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "initial";
        }
    });

    if (menuClose) {
        menuClose.addEventListener("click", function () {
            menuIcon.classList.remove("active");
            fullMenu.classList.remove("active");
            document.body.style.overflow = "initial";
        });
    }

    // Close menu when a link is clicked
    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            menuIcon.classList.remove("active");
            fullMenu.classList.remove("active");
            document.body.style.overflow = "initial";
        });
    });
}
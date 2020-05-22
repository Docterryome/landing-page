/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const MENU_LINK = "menu__link";
const navBarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const sectionDivs = document.querySelectorAll("landing__container");
const documentFragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createNav(element){
    console.dir(element);
    const navli = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `#${element.id}`);
    anchor.classList.add(MENU_LINK);
    anchor.textContent = element.dataset.nav
    navli.appendChild(anchor);
    documentFragment.appendChild(navli);
}

// Add class 'active' to section when near top of viewport
function checkActive(section){
    const OFFSET = 350;
    const anchor = document.querySelector(`a[href="#${section.id}"]`);
    const sectionViewPoint = section.getBoundingClientRect();
    if(sectionViewPoint.top <= OFFSET && (sectionViewPoint.height * -1 + OFFSET) <= sectionViewPoint.top){
        section.classList.add("your-active-class");
        anchor.parentElement.classList.add("your-active-class");
    }
    else{
        section.classList.remove("your-active-class");
        anchor.parentElement.classList.remove("your-active-class");
    }
}

function scrollActive(event){
    sections.forEach(section => checkActive(section))
}


// Scroll to anchor ID using scrollTO event
function smoothScrolling(event){
    const anchor = event.target;
    const section = document.querySelector(anchor.attributes.href.value);
    event.preventDefault();
    section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}





/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
sections.forEach(section => createNav(section));
navBarList.appendChild(documentFragment);

// Scroll to section on link click
navBarList.addEventListener("click", smoothScrolling);

// Set sections as active
document.addEventListener("scroll", scrollActive);
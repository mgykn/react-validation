//Accordion
export function accordion() {
    var accordionHeader = document.getElementsByClassName("accordion-header");

    detachEvent("click", accordionHeader, accordionFunction);
    attachEvent("click", accordionHeader, accordionFunction);
}

function accordionFunction(){
    if (this.parentElement.classList.value.indexOf("active") != -1) {
        this.parentElement.classList.remove("active");
        slideUp(this.parentElement.getElementsByClassName("accordion-body")[0], 300);
    }
    else {
        this.parentElement.classList.add("active");
        slideDown(this.parentElement.getElementsByClassName("accordion-body")[0], 300);
    }
}

//Mobile Accordion
export function mobileAccordion(){
    var mobileAccordionHeader = document.querySelectorAll(".mobile-accordion .header");
    
    detachEvent("click", mobileAccordionHeader, mobileAccordionFunction);
    attachEvent("click", mobileAccordionHeader, mobileAccordionFunction);
}

function mobileAccordionFunction(){
    if (window.innerWidth + getScrollBarWidth() <= 900) {
        if (this.parentElement.classList.value.indexOf("active") != -1) {
            this.parentElement.classList.remove("active");

            var slideItems = this.closest(".container").querySelectorAll(".left .header > *:not(.title):not(.title-default), .left > *:not(.header)");

            for (var i = 0; i < slideItems.length; i++) {
                slideUp(slideItems[i], 300);
            };
        }
        else {
            this.parentElement.classList.add("active");

            var slideItems = this.closest(".container").querySelectorAll(".left .header > *:not(.title):not(.title-default), .left > *:not(.header)");
            
            for (var i = 0; i < slideItems.length; i++) {
                slideDown(slideItems[i], 300);
            };        
        }
    };
}


//General

function slideDown(elem, time) {
    var elemHeight;
    elem.style.display = "block";
    elem.style.overflow = "hidden";
    elemHeight = elem.offsetHeight;

    elem.style.height = 0;
    var startTime = performance.now();

    function processAnimation() {
        var currentTime = performance.now();
        if (startTime + time >= currentTime) {
            elem.style.height = elemHeight * easeInOut((currentTime - startTime) / time) + "px";
            requestAnimationFrame(processAnimation);
        }
        else {
            elem.style.height = elemHeight;
            elem.removeAttribute("style");
            elem.style.display = "block";
        }
    }

    requestAnimationFrame(processAnimation);
}

function slideUp(elem, time) {
    var elemHeight;
    elem.style.display = "block";
    elem.style.overflow = "hidden";
    elemHeight = elem.offsetHeight;

    elem.style.height = 0;
    var startTime = performance.now();

    function processAnimation() {
        var currentTime = performance.now();
        if (startTime + time >= currentTime) {
            elem.style.height = elemHeight * easeInOut(1 - (currentTime - startTime) / time) + "px";
            requestAnimationFrame(processAnimation);
        }
        else {
            elem.style.height = 0;
            elem.removeAttribute("style");
        }
    }

    requestAnimationFrame(processAnimation);
}

function attachEvent(eventName, elemArr, func) {
    for (var i = 0; i < elemArr.length; i++) {
        elemArr[i].addEventListener(eventName, func);
    };
}

function detachEvent(eventName, elemArr, func) {
    for (var i = 0; i < elemArr.length; i++) {
        elemArr[i].removeEventListener(eventName, func);
    };
}

export function easeInOut(t) {
    return t<.5 ? 2*t*t : -1+(4-2*t)*t;
}

function getScrollBarWidth () {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
}
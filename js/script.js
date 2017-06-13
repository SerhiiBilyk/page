var doc = document,
    toArrayByClassName = nodes => [].slice.call(doc.getElementsByClassName(nodes)),
    header = doc.getElementById('header'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    dropdownContainer = toArrayByClassName('dropdown-container'),
    dropdownMenu = toArrayByClassName('dropdown-menu'),
    parallaxItem = toArrayByClassName('anim-item-1'),
    animatedBlocks = toArrayByClassName('anim-item-2'),
    animatedBlocks3 = toArrayByClassName('anim-item-3'),
    slides = toArrayByClassName('slide');



/**
 *@param {object} settings, properties: prev/next(button objects), slides (slide, usually 'LI' element)
 */
var slider = (function(settings) {

    /*private method*/
    var currentIndex = 0,
        slideIndex = 1,
        slideClick;

    /*closure*/
    var wrapper = n => slideClick = () => slideRender(slideIndex += n);


    settings.prev.addEventListener('click', wrapper(-1));
    settings.next.addEventListener('click', wrapper(1));

    /*private method*/
    function slideRender(n) {
        var i,
            slides = settings.slides;

        n > slides.length ? slideIndex = 1 : false;
        n < 1 ? slideIndex = slides.length : false;

        slides.forEach(function(element, index) {
            element.style.display = "none";
            index == slideIndex - 1 ? element.style.opacity = "0" : false;
        });
        slides[slideIndex - 1].style.display = "block";
        setTimeout(function() {
            slides[slideIndex - 1].style.opacity = "1";
        }, 0)

    }
    slideRender(slideIndex);
    return {
        wrapper: wrapper,
        slideRender: slideRender
    }
})({
    prev: prev,
    next: next,
    slides: slides
});




window.addEventListener('resize', function(e) {
    function transitionNone(element) {
        element.style.transition = "none";
    }
    var mix = parallaxItem.concat(animatedBlocks, animatedBlocks3);
    mix.forEach(transitionNone);
});
window.addEventListener('load', function(e) {
    parallaxItem.forEach(function(element) {
        element.style.transition = "all 1s ease";
    })
    setTimeout(function() {
        window.scrollTo(0, 0);
    });
});

doc.addEventListener("scroll", function(e) {
    var run = new Promise(
        function(res, rej) {
            var pageYOffset = window.pageYOffset;
            if (e) {
                /*header logic*/
                if (pageYOffset < 10) {
                    header.className = "";
                }
                if (pageYOffset > 100) {
                    header.className = "scrolled";
                    parallaxItem.forEach(function(element, index) {
                        element.className = "anim-item-1 item-" + (index + 1);
                    });
                }
                if (pageYOffset > 400) {
                    animatedBlocks.forEach(function(element, index) {
                        element.className = "anim-item-2 item-" + (index + 5);
                    })
                }
                if (pageYOffset > 600) {
                    animatedBlocks3.forEach(function(element, index) {
                        element.className = "anim-item-3 item-" + (index + 8);
                    })
                }

                res('done')
            } else {
                rej('cancel')
            }
        }
    );
    run.then(function(result) {
        /*this script for more complicated JS navigation logic
        dropdownContainer.forEach(function(element) {
            var currentCSS = element.children[1].style;
            element.addEventListener('mouseover', function(e) {
              console.log(element)
                currentCSS.display = 'block';
                currentCSS.visibility = 'visible';
                currentCSS.height = '230px';
            })
            element.addEventListener('mouseleave', function(e) {
                element.children[1].removeAttribute('style')
            })
        })
        */
    })
});

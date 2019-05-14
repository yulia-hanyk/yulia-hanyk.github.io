$(function () {
    //FastClick.attach(document.body);
});

var pageLoaded = false;
var scrollTop = 0;
var scrollBottom = 0;

// Ready to go

$(document).ready(function () {

    var $body = $("body");
    var $html = $("html");
    var hasMouse = Modernizr.mousehover;
    var hasTransitions = Modernizr.csstransitions;

    // Transit animation fallback for older browsers

    var easeInOut = "ease-in-out";
    if (!hasTransitions) {
        $.fn.transition = $.fn.animate;
        easeInOut = "easeInOutQuint";
    }

    // Hammer defaults

    if (hasTransitions && !hasMouse) {
        Hammer.defaults.domEvents = true;
        Hammer.defaults.direction = Hammer.DIRECTION_ALL;
    }

    // Prevent AJAX caching

    $.ajaxSetup({
        cache: false
    });


    // CSS prefix

    var prefix = (/webkit/.test(navigator.userAgent.toLowerCase())) ? '-webkit-' : '';


    // Get base URL for use in scripts

    var l = window.location;
    baseURL = l.protocol + "//" + l.host;

    var siteURL = $body.data("site-url");
    var siteTitle = $body.data("site-title");


    // Fix wrong height on iOS7 iPad Landscape

    var iOS7 = false;

    if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && !window.navigator.standalone) {
        iOS7 = true;
        $html.addClass("ipad ios7");
    }

    // Init gallery

    var $sliders;
    var animatedIn = false;
    var isAnimating = false;
    var wasHovered = false;
    var scrollBarWidth = 0;

    var windowWidth = 0;
    var windowHeight = 0;
    var oldWindowWidth = 0;

    var isScrolling = false;
    var noScrollOnce = false;
    var lastScrollTop = 0;
    var prevScrollTop = 0;
    var historyScrollTop = 0;
    var scrollDuration = 1000;
    var scrollingToTop = false;
    var animatingScroll = false;
    var forceMenu = false;
    var menuOpen = false;
    var noWheel = false;


    // Slider

    var slideDuration = 800;
    var opacityDuration = 600;

    var imageReady = false;

    if (!hasTransitions) {
        slideDuration = 0;
        opacityDuration = 0;
    }

    if (!hasMouse) {
        slideDuration = 650;
    }

    $.fn.initSlider = function (options) {
        return this.each(function () {
            var defaults = {
                slideIndex: 1,
                targetIndex: 1,
                isRight: false
            };

            options = $.extend(defaults, options);

            var $slider = $(this);

            var hasCaptions = false;
            var isAnimating = false;

            var $allSlides = $slider.find(".slide");

            if (options.isRight)
                $allSlides.addClass("right-aligned");

            var $currentSlide = $allSlides.eq(options.slideIndex - 1);
            $currentSlide.addClass("inview");

            if (($currentSlide.is(".full-slide") && windowWidth >= 1024) || (!$currentSlide.is(".full-slide") && windowWidth < 1024))
                $body.addClass("white-nav");

            $slider.addClass("initialised");

            var $captions = $slider.find(".caption");
            var $caption = false;

            var $nextSlide = $currentSlide.next(".slide");
            if (!$nextSlide.length) $nextSlide = $allSlides.first();
            $nextSlide.addClass("next-slide");

            var $prevSlide = $currentSlide.prev(".slide");
            if (!$prevSlide.length) $prevSlide = $allSlides.last();
            $prevSlide.addClass("prev-slide");

            $currentSlide.loadImage(function () {
                imageReady = true;
            }).addClass("current slide-loaded");

            $slider.attr("data-index", "1").attr("data-total", $allSlides.length);

            setTimeout(function () {
                $nextSlide.loadImage().addClass("slide-loaded");
                $prevSlide.loadImage().addClass("slide-loaded");
            }, 1000);

            $(this).data('sliderVars', {
                allSlides: $allSlides,
                currentSlide: $currentSlide,
                nextSlide: $nextSlide,
                prevSlide: $prevSlide,
                isAnimating: isAnimating
            });

            if (hasTransitions && !hasMouse && windowWidth >= 768) {
                var sliderSwipe = new Hammer($slider[0]);
                sliderSwipe.get("swipe").set({
                    direction: Hammer.DIRECTION_HORIZONTAL,
                    preventDefault: true
                });

                sliderSwipe.on("swipe", function (e) {
                    //e.stopImmediatePropagation();
                    //e.stopPropagation();
                    //e.preventDefault();

                    if (e.direction == 2)
                        $slider.nextSlide();
                    else if (e.direction == 4)
                        $slider.prevSlide();
                });
            }
        });
    };

    $.fn.nextSlide = function () {
        return this.each(function () {

            var $slider = $(this);
            var $allSlides = $slider.data("sliderVars").allSlides;
            var $nextSlide = $slider.data("sliderVars").nextSlide;
            var $prevSlide = $slider.data("sliderVars").prevSlide;
            var $currentSlide = $slider.data("sliderVars").currentSlide;
            var isAnimating = $slider.data("sliderVars").isAnimating;

            if (!isAnimating && $allSlides.length > 1) {
                $slider.data("sliderVars").isAnimating = true;

                var $oldCurrentSlide = $currentSlide;
                var $oldPrevSlide = $prevSlide;

                var $futureNextSlide = $nextSlide.next(".slide");
                if (!$futureNextSlide.length)
                    $futureNextSlide = $allSlides.first();

                if (!$nextSlide.is(".slide-loaded"))
                    $nextSlide.loadImage().addClass("slide-loaded");

                $nextSlide.transition({
                    x: windowWidth
                }, 0).transition({
                    x: 0
                }, slideDuration, "easeInOutCubic", function () {

                    $prevSlide = $currentSlide;
                    $prevSlide.removeClass("current").addClass("prev-slide");

                    $oldPrevSlide.removeClass("prev-slide");

                    $currentSlide = $nextSlide;
                    $currentSlide.removeClass("next-slide").addClass("current");

                    $nextSlide = $futureNextSlide;

                    if (!$nextSlide.is(".slide-loaded"))
                        $nextSlide.loadImage().addClass("slide-loaded");

                    $nextSlide.addClass("next-slide");

                    $slider.data("sliderVars").isAnimating = false;

                    $slider.data("sliderVars").nextSlide = $nextSlide;
                    $slider.data("sliderVars").prevSlide = $prevSlide;
                    $slider.data("sliderVars").currentSlide = $currentSlide;
                });

                $oldCurrentSlide.transition({
                    x: -windowWidth
                }, slideDuration, "easeInOutCubic");

                var nextCaption = $nextSlide.find(".caption").html();

                if (nextCaption !== $("#caption").html())
                    $("#caption").transition({
                        opacity: 0
                    }, slideDuration / 2, easeInOut, function () {
                        $("#caption").html($nextSlide.find(".caption").html());

                        $("#caption").transition({
                            opacity: 1
                        }, slideDuration / 2, easeInOut);
                    });

                setTimeout(function () {
                    $("#thumb-" + $oldCurrentSlide.data("index")).removeClass("current");
                    $("#thumb-" + $nextSlide.data("index")).addClass("current");

                    if (($nextSlide.is(".full-slide") && windowWidth >= 1024) || (!$nextSlide.is(".full-slide") && windowWidth < 1024))
                        $body.addClass("white-nav");
                    else
                        $body.removeClass("white-nav");
                }, slideDuration / 2);
            }
        });
    }

    $.fn.prevSlide = function () {
        return this.each(function () {

            var $slider = $(this);
            var $allSlides = $slider.data("sliderVars").allSlides;
            var $nextSlide = $slider.data("sliderVars").nextSlide;
            var $prevSlide = $slider.data("sliderVars").prevSlide;
            var $currentSlide = $slider.data("sliderVars").currentSlide;
            var isAnimating = $slider.data("sliderVars").isAnimating;

            if (!isAnimating && $allSlides.length > 1) {
                $slider.data("sliderVars").isAnimating = true;

                var $oldCurrentSlide = $currentSlide;
                var $oldNextSlide = $nextSlide;

                var $futurePrevSlide = $prevSlide.prev(".slide");
                if (!$futurePrevSlide.length)
                    $futurePrevSlide = $allSlides.last();

                if (!$prevSlide.is(".slide-loaded"))
                    $prevSlide.loadImage().addClass("slide-loaded")

                $prevSlide.transition({
                    x: -windowWidth
                }, 0).transition({
                    x: 0
                }, slideDuration, "easeInOutCubic", function () {

                    $nextSlide = $currentSlide;
                    $nextSlide.removeClass("current").addClass("next-slide");

                    $oldNextSlide.removeClass("next-slide");

                    $currentSlide = $prevSlide;
                    $currentSlide.removeClass("prev-slide").addClass("current");

                    $prevSlide = $futurePrevSlide;

                    if (!$prevSlide.is(".slide-loaded"))
                        $prevSlide.loadImage().addClass("slide-loaded");

                    $prevSlide.addClass("prev-slide");

                    $slider.data("sliderVars").isAnimating = false;

                    $slider.data("sliderVars").nextSlide = $nextSlide;
                    $slider.data("sliderVars").prevSlide = $prevSlide;
                    $slider.data("sliderVars").currentSlide = $currentSlide;
                });

                $oldCurrentSlide.transition({
                    x: windowWidth
                }, slideDuration, "easeInOutCubic");

                var prevCaption = $prevSlide.find(".caption").html();

                if (prevCaption !== $("#caption").html())
                    $("#caption").transition({
                        opacity: 0
                    }, slideDuration / 2, easeInOut, function () {
                        $("#caption").html($prevSlide.find(".caption").html());

                        $("#caption").transition({
                            opacity: 1
                        }, slideDuration / 2, easeInOut);
                    });

                setTimeout(function () {
                    $("#thumb-" + $oldCurrentSlide.data("index")).removeClass("current");
                    $("#thumb-" + $prevSlide.data("index")).addClass("current");

                    if (($prevSlide.is(".full-slide") && windowWidth >= 1024) || (!$prevSlide.is(".full-slide") && windowWidth < 1024))
                        $body.addClass("white-nav");
                    else
                        $body.removeClass("white-nav");

                }, slideDuration / 2);
            }
        });
    }

    $(document).on("click", "#slider", function (e) {
        e.preventDefault();

        if (e.pageX <= windowWidth / 2)
            $("#slider").prevSlide();
        else
            $("#slider").nextSlide();
    });

    /*$(document).on("click", "#next-slide", function(e) {
    	e.preventDefault();
    									
    	$("#slider").nextSlide();
    });*/

    $(document).on("click", "#thumbs a", function (e) {
        e.stopPropagation();
        var $dot = $(this);

        if (!$dot.is(".current")) {
            var $slider = $("#slider");
            var $currentSlide = $slider.data("sliderVars").currentSlide;
            var slideIndex = $dot.data("slide");

            if (slideIndex < $slider.data("sliderVars").currentSlide.data("index")) {
                $slider.data("sliderVars").prevSlide = $slider.data("sliderVars").allSlides.eq(slideIndex - 1);
                $slider.prevSlide();
            } else {
                $slider.data("sliderVars").nextSlide = $slider.data("sliderVars").allSlides.eq(slideIndex - 1);
                $slider.nextSlide();
            }
        }
    });


    // Home

    playIntro = function () {

        $("#yulia").transition({
            opacity: 1
        }, slideDuration, easeInOut);
        $("#hanyk").transition({
            opacity: 1,
            delay: slideDuration * 3 / 4
        }, slideDuration, easeInOut);

        $("#layout").data("sliderVars").currentLeft.transition({
            opacity: 1,
            delay: slideDuration * 6 / 4
        }, slideDuration, easeInOut);
        $("#layout").data("sliderVars").currentRight.transition({
            opacity: 1,
            delay: slideDuration * 9 / 4
        }, slideDuration, easeInOut, function () {

            $html.removeClass("intro-animation");
            $("#yulia, #hanyk").removeAttr("style");
            $("#layout").data("sliderVars").currentLeft.removeAttr("style");
            $("#layout").data("sliderVars").currentRight.removeAttr("style");

        });
    }

    mobileIntro = function () {

        $("#yulia").transition({
            opacity: 1
        }, slideDuration, easeInOut);
        $("#hanyk").transition({
            opacity: 1,
            delay: slideDuration * 3 / 4
        }, slideDuration, easeInOut);

        $("#layout").transition({
            opacity: 1,
            delay: slideDuration * 6 / 4
        }, slideDuration, easeInOut, function () {

            $html.removeClass("intro-animation");
            $("#yulia, #hanyk").removeAttr("style");
            $("#layout").removeAttr("style");
        });
    }

    $.fn.initHome = function (options) {
        return this.each(function () {
            var defaults = {
                indexLeft: 1,
                indexRight: 1
            };

            options = $.extend(defaults, options);

            var $slider = $(this);

            var isAnimating = false;

            var $allLeft = $slider.find(".left");
            var $currentLeft = $allLeft.eq(options.indexLeft - 1);

            var $allRight = $slider.find(".right");
            var $currentRight = $allRight.eq(options.indexRight - 1);

            $slider.addClass("initialised");

            var $prevLeft = $allLeft.eq(options.indexLeft - 2);
            if (!$prevLeft.length) $prevLeft = $allLeft.last();
            $prevLeft.addClass("prev-left");

            var $nextLeft = $allLeft.eq(options.indexLeft);
            if (!$nextLeft.length) $nextLeft = $allLeft.first();
            $nextLeft.addClass("next-left");

            var $prevRight = $allRight.eq(options.indexRight - 2);
            if (!$prevRight.length) $prevRight = $allRight.last();
            $prevRight.addClass("prev-right");

            var $nextRight = $allRight.eq(options.indexRight);
            if (!$nextRight.length) $nextRight = $allRight.first();
            $nextRight.addClass("next-right");

            $currentLeft.loadImage().addClass("current slide-loaded");
            $currentRight.loadImage().addClass("current slide-loaded");

            setTimeout(function () {
                $nextLeft.loadImage().addClass("slide-loaded");
                $nextRight.loadImage().addClass("slide-loaded");
                $prevLeft.loadImage().addClass("slide-loaded");
                $prevRight.loadImage().addClass("slide-loaded");
            }, 1000);

            $(this).data('sliderVars', {
                allLeft: $allLeft,
                allRight: $allRight,
                indexLeft: options.indexLeft,
                indexRight: options.indexRight,
                currentLeft: $currentLeft,
                currentRight: $currentRight,
                prevLeft: $prevLeft,
                nextLeft: $nextLeft,
                prevRight: $prevRight,
                nextRight: $nextRight,
                isAnimatingLeft: false,
                isAnimatingRight: false
            });

            if (hasTransitions && !hasMouse && windowWidth >= 768) {
                var homeSwipe = new Hammer($slider[0]);
                homeSwipe.get("swipe").set({
                    direction: Hammer.DIRECTION_ALL,
                    preventDefault: true
                });

                homeSwipe.on("swipe", function (e) {
                    //e.stopImmediatePropagation();
                    //e.stopPropagation();
                    //e.preventDefault();

                    if (!$body.is(".about-open") && !isAnimating && !ajaxInProgress && !$html.is(".intro-animation")) {
                        var xPos = e.pointers[0].pageX;

                        if (!$html.is(".sliding"))
                            $html.addClass("sliding");

                        if (xPos <= windowWidth / 3) {
                            if (e.direction == 16 || e.direction == 2)
                                $("#layout").prevLeft();
                            else
                                $("#layout").nextLeft();
                        } else if (xPos > windowWidth / 3 && xPos < windowWidth / 3 * 2) {
                            if (e.direction == 16 || e.direction == 2) {
                                $("#layout").nextLeft();
                                $("#layout").nextRight();
                            } else {
                                $("#layout").prevLeft();
                                $("#layout").prevRight();
                            }
                        } else {
                            if (e.direction == 16 || e.direction == 2)
                                $("#layout").nextRight();
                            else
                                $("#layout").prevRight();
                        }

                        setTimeout(function () {
                            noWheel = false;
                        }, slideDuration + 500);
                    }
                });
            }

            if ($html.is(".intro-animation")) {
                playIntro();
            }
        });
    };

    $.fn.prevLeft = function () {
        return this.each(function () {

            var $slider = $(this);
            var indexLeft = $slider.data("sliderVars").indexLeft;
            var $allLeft = $slider.data("sliderVars").allLeft;
            var $nextLeft = $slider.data("sliderVars").nextLeft;
            var $prevLeft = $slider.data("sliderVars").prevLeft;
            var $currentLeft = $slider.data("sliderVars").currentLeft;
            var isAnimatingLeft = $slider.data("sliderVars").isAnimatingLeft;

            if (!isAnimatingLeft && $allLeft.length > 1) {
                $slider.data("sliderVars").isAnimatingLeft = true;
                $html.addClass("sliding");

                var $oldCurrentLeft = $currentLeft;
                var $oldNextLeft = $nextLeft;

                indexLeft = $prevLeft.data("index");

                var $futurePrevLeft = $allLeft.eq(indexLeft - 2);
                if (!$futurePrevLeft.length)
                    $futurePrevLeft = $allLeft.last();

                $prevLeft.transition({
                    y: -windowHeight
                }, 0).transition({
                    y: 0
                }, slideDuration, "easeInOutCubic", function () {

                    $nextLeft = $currentLeft;
                    $nextLeft.removeClass("current").addClass("next-left");

                    $oldNextLeft.removeClass("next-left");

                    $currentLeft = $prevLeft;
                    $currentLeft.removeClass("prev-left").addClass("current");

                    $prevLeft = $futurePrevLeft;

                    if (!$prevLeft.is(".slide-loaded"))
                        $prevLeft.loadImage().addClass("slide-loaded");

                    $prevLeft.addClass("prev-left");

                    $html.removeClass("sliding");
                    $slider.data("sliderVars").isAnimatingLeft = false;

                    $slider.data("sliderVars").nextLeft = $nextLeft;
                    $slider.data("sliderVars").prevLeft = $prevLeft;
                    $slider.data("sliderVars").currentLeft = $currentLeft;
                    $slider.data("sliderVars").indexLeft = indexLeft;
                });

                $oldCurrentLeft.transition({
                    y: windowHeight
                }, slideDuration, "easeInOutCubic");
            }
        });
    }

    $.fn.nextLeft = function () {
        return this.each(function () {

            var $slider = $(this);
            var indexLeft = $slider.data("sliderVars").indexLeft;
            var $allLeft = $slider.data("sliderVars").allLeft;
            var $nextLeft = $slider.data("sliderVars").nextLeft;
            var $prevLeft = $slider.data("sliderVars").prevLeft;
            var $currentLeft = $slider.data("sliderVars").currentLeft;
            var isAnimatingLeft = $slider.data("sliderVars").isAnimatingLeft;

            if (!isAnimatingLeft && $allLeft.length > 1) {
                $slider.data("sliderVars").isAnimatingLeft = true;
                $html.addClass("sliding");

                var $oldCurrentLeft = $currentLeft;
                var $oldprevLeft = $prevLeft;

                indexLeft = $nextLeft.data("index");

                var $futureNextLeft = $allLeft.eq(indexLeft);
                if (!$futureNextLeft.length) {
                    $futureNextLeft = $allLeft.first();
                }

                $nextLeft.transition({
                    y: windowHeight
                }, 0).transition({
                    y: 0
                }, slideDuration, "easeInOutCubic", function () {

                    $prevLeft = $currentLeft;
                    $prevLeft.removeClass("current").addClass("prev-left");

                    $oldprevLeft.removeClass("prev-left");

                    $currentLeft = $nextLeft;
                    $currentLeft.removeClass("next-left").addClass("current");

                    $nextLeft = $futureNextLeft;

                    if (!$nextLeft.is(".slide-loaded"))
                        $nextLeft.loadImage().addClass("slide-loaded");

                    $nextLeft.addClass("next-left");

                    $html.removeClass("sliding");
                    $slider.data("sliderVars").isAnimatingLeft = false;

                    $slider.data("sliderVars").nextLeft = $nextLeft;
                    $slider.data("sliderVars").prevLeft = $prevLeft;
                    $slider.data("sliderVars").currentLeft = $currentLeft;
                    $slider.data("sliderVars").indexLeft = indexLeft;
                });

                $oldCurrentLeft.transition({
                    y: -windowHeight
                }, slideDuration, "easeInOutCubic");
            }
        });
    }

    $.fn.nextRight = function () {
        return this.each(function () {

            var $slider = $(this);
            var indexRight = $slider.data("sliderVars").indexRight;
            var $allRight = $slider.data("sliderVars").allRight;
            var $nextRight = $slider.data("sliderVars").nextRight;
            var $prevRight = $slider.data("sliderVars").prevRight;
            var $currentRight = $slider.data("sliderVars").currentRight;
            var isAnimatingRight = $slider.data("sliderVars").isAnimatingRight;

            if (!isAnimatingRight && $allRight.length > 1) {
                $slider.data("sliderVars").isAnimatingRight = true;
                $html.addClass("sliding");

                var $oldCurrentRight = $currentRight;
                var $oldprevRight = $prevRight;

                indexRight = $nextRight.data("index");

                var $futureNextRight = $allRight.eq(indexRight);
                if (!$futureNextRight.length) {
                    $futureNextRight = $allRight.first();
                }

                $nextRight.transition({
                    y: -windowHeight
                }, 0).transition({
                    y: 0
                }, slideDuration, "easeInOutCubic", function () {

                    $prevRight = $currentRight;
                    $prevRight.removeClass("current").addClass("prev-right");

                    $oldprevRight.removeClass("prev-right");

                    $currentRight = $nextRight;
                    $currentRight.removeClass("next-right").addClass("current");

                    $nextRight = $futureNextRight;

                    if (!$nextRight.is(".slide-loaded"))
                        $nextRight.loadImage().addClass("slide-loaded");

                    $nextRight.addClass("next-right");

                    $html.removeClass("sliding");
                    $slider.data("sliderVars").isAnimatingRight = false;

                    $slider.data("sliderVars").nextRight = $nextRight;
                    $slider.data("sliderVars").prevRight = $prevRight;
                    $slider.data("sliderVars").currentRight = $currentRight;
                    $slider.data("sliderVars").indexRight = indexRight;
                });

                $oldCurrentRight.transition({
                    y: windowHeight
                }, slideDuration, "easeInOutCubic");
            }
        });
    }

    $.fn.prevRight = function () {
        return this.each(function () {

            var $slider = $(this);
            var indexRight = $slider.data("sliderVars").indexRight;
            var $allRight = $slider.data("sliderVars").allRight;
            var $nextRight = $slider.data("sliderVars").nextRight;
            var $prevRight = $slider.data("sliderVars").prevRight;
            var $currentRight = $slider.data("sliderVars").currentRight;
            var isAnimatingRight = $slider.data("sliderVars").isAnimatingRight;

            if (!isAnimatingRight && $allRight.length > 1) {
                $slider.data("sliderVars").isAnimatingRight = true;
                $html.addClass("sliding");

                var $oldCurrentRight = $currentRight;
                var $oldNextRight = $nextRight;

                indexRight = $prevRight.data("index");

                var $futurePrevRight = $allRight.eq(indexRight - 2);
                if (!$futurePrevRight.length)
                    $futurePrevRight = $allRight.last();

                $prevRight.transition({
                    y: windowHeight
                }, 0).transition({
                    y: 0
                }, slideDuration, "easeInOutCubic", function () {

                    $nextRight = $currentRight;
                    $nextRight.removeClass("current").addClass("next-right");

                    $oldNextRight.removeClass("next-right");

                    $currentRight = $prevRight;
                    $currentRight.removeClass("prev-right").addClass("current");

                    $prevRight = $futurePrevRight;

                    if (!$prevRight.is(".slide-loaded"))
                        $prevRight.loadImage().addClass("slide-loaded");

                    $prevRight.addClass("prev-right");

                    $html.removeClass("sliding");
                    $slider.data("sliderVars").isAnimatingRight = false;

                    $slider.data("sliderVars").nextRight = $nextRight;
                    $slider.data("sliderVars").prevRight = $prevRight;
                    $slider.data("sliderVars").currentRight = $currentRight;
                    $slider.data("sliderVars").indexRight = indexRight;
                });

                $oldCurrentRight.transition({
                    y: -windowHeight
                }, slideDuration, "easeInOutCubic");
            }
        });
    }

    $(document).on("mousemove", "#layout", function (e) {
        if (hasMouse && windowWidth >= 768) {
            if (e.pageX <= windowWidth / 3) {
                if (e.pageY < windowHeight / 2)
                    $("#layout").removeClass("upup-down-cursor up-downdown-cursor down-cursor").addClass("up-cursor");
                else
                    $("#layout").removeClass("upup-down-cursor up-downdown-cursor up-cursor").addClass("down-cursor");
            } else if (e.pageX > windowWidth / 3 && e.pageX < windowWidth / 3 * 2) {
                if (e.pageY < windowHeight / 2)
                    $("#layout").removeClass("up-downdown-cursor down-cursor up-cursor").addClass("upup-down-cursor");
                else
                    $("#layout").removeClass("upup-down-cursor down-cursor up-cursor").addClass("up-downdown-cursor");
            } else {
                if (e.pageY < windowHeight / 2)
                    $("#layout").removeClass("upup-down-cursor up-downdown-cursor down-cursor").addClass("up-cursor");
                else
                    $("#layout").removeClass("upup-down-cursor up-downdown-cursor up-cursor").addClass("down-cursor");
            }
        }
    });

    $(document).on("mousemove", "#slider", function (e) {
        if (hasMouse && windowWidth >= 768) {
            if (e.pageX <= windowWidth / 2) {
                $("#single").removeClass("right-cursor").addClass("left-cursor");
            } else {
                $("#single").addClass("right-cursor").removeClass("left-cursor");
            }
        }
    });

    /*$(document).on("click", "#left-arrow", function(e) {
    	e.preventDefault();
    									
    	$("#layout").nextLeft();
    });
	
    $(document).on("click", "#right-arrow", function(e) {
    	e.preventDefault();
    									
    	$("#layout").nextRight();
    });
	
    $(document).on("click", "#center-arrow", function(e) {
    	e.preventDefault();
    	
    	$("#layout").nextLeft();							
    	$("#layout").nextRight();
    });*/

    // Resize handler

    handleResize = function (e) {

        var resizeEvent = typeof e !== 'undefined' ? e : false;

        if (resizeEvent && pageLoaded)
            $html.addClass("resizing");

        var oldWindowWidth = windowWidth;
        var reportedWidth = $(window).width();

        if (hasMouse) {
            var $container = $("<div>").css({
                height: 1,
                overflow: "scroll"
            }).appendTo("body");
            var $child = $("<div>").css({
                height: 2
            }).appendTo($container);

            scrollBarWidth = $container.width() - $child.width();

            if (scrollBarWidth != 0)
                $html.addClass("visible-scrollbar");
            else
                $html.removeClass("visible-scrollbar");

            if ($child.width() != $container.width()) {
                //windowWidth = $child.width();
                //$("#inline-clone").width($("#scroller").width() - scrollBarWidth);
                //$("#close-single").attr("style", "right: " + scrollBarWidth + "px");
            }

            windowWidth = reportedWidth;

            $container.remove();
        } else {
            windowWidth = reportedWidth;
        }


        if (iOS7 && windowWidth == 1024)
            windowHeight = 672;
        else
            windowHeight = $(window).height();


        if ((navigator.userAgent.match(/iphone|ipod|ipad/) || !Modernizr.cssvwunit || !Modernizr.cssvhunit) && windowWidth <= 767) {
            $("#text-content").outerHeight(windowHeight);
        }

        // Resize slider

        $(".slider").each(function () {
            var $slider = $(this);

            if ($slider.is(".initialised")) {
                // Resize slideshow images

                if (windowWidth >= 768) {
                    if (oldWindowWidth < 768) {
                        $slider.removeAttr("style");
                    }

                    $slider.data("sliderVars").allSlides.each(function () {
                        var $slideObj = $(this);

                        if (!$body.is(".home")) {
                            if ($slideObj.is(".current")) {
                                $slideObj.transition({
                                    x: 0
                                }, 0);
                            } else if ($slideObj.is(".next-slide")) {
                                $slideObj.transition({
                                    x: windowWidth
                                }, 0);
                            } else if ($slideObj.is(".prev-slide")) {
                                $slideObj.transition({
                                    x: -windowWidth
                                }, 0);
                            } else {
                                $slideObj.transition({
                                    x: windowWidth
                                }, 0);
                            }
                        }
                    });
                } else {
                    $slider.removeAttr("style");
                }

                setTimeout(function () {
                    $slider.addClass("resized");
                }, 250);
            }
        });

        $("#layout").each(function () {
            var $slider = $(this);

            if ($slider.is(".initialised")) {
                // Resize slideshow images

                if (windowWidth >= 768) {
                    if (oldWindowWidth < 768) {
                        $slider.removeAttr("style");
                    }

                    $slider.data("sliderVars").allLeft.each(function () {
                        var $slideObj = $(this);

                        if ($slideObj.is(".current")) {
                            $slideObj.transition({
                                y: 0
                            }, 0);
                        } else if ($slideObj.is(".next-left")) {
                            $slideObj.transition({
                                y: windowHeight
                            }, 0);
                        } else if ($slideObj.is(".prev-left")) {
                            $slideObj.transition({
                                y: -windowHeight
                            }, 0);
                        } else {
                            $slideObj.transition({
                                y: windowHeight
                            }, 0);
                        }
                    });

                    $slider.data("sliderVars").allRight.each(function () {
                        var $slideObj = $(this);

                        if ($slideObj.is(".current")) {
                            $slideObj.transition({
                                y: 0
                            }, 0);
                        } else if ($slideObj.is(".next-right")) {
                            $slideObj.transition({
                                y: windowHeight
                            }, 0);
                        } else if ($slideObj.is(".prev-right")) {
                            $slideObj.transition({
                                y: -windowHeight
                            }, 0);
                        } else {
                            $slideObj.transition({
                                y: windowHeight
                            }, 0);
                        }
                    });
                } else {
                    $slider.removeAttr("style");
                }

                setTimeout(function () {
                    $slider.addClass("resized");
                }, 250);
            }
        });

        setTimeout(function () {
            if (windowWidth >= 1024) {
                $(".fit-img").fitImages();
                $(".cover-img").coverImages();
            } else if (windowWidth >= 768) {
                $("#layout .fit-img, #slider .cover-img").fitImages();
                $("#layout .cover-img, #slider .fit-img").coverImages();
            }
        }, 50);


        Waypoint.refreshAll();

        setTimeout(function () {
            $html.removeClass("resizing");
        }, 150);

    }

    if (!("onorientationchange" in window)) {
        $(window).resize(function () {
            handleResize(true);
        });
    } else {
        $(window).on('orientationchange', function (event) {
            $html.addClass("resizing");

            setTimeout(function () {
                handleResize(true);

                setTimeout(function () {
                    $html.removeClass("resizing");
                }, 500);
            }, 100);
        });
    }


    // Load images

    loadImages = function () {
        var $imagesToLoad = $("#layout, #single").find(".img-holder");

        $imagesToLoad.each(function (index) {
            var $box = $(this);
            var $img = $(this).find("img").eq(0);

            /*if($box.is(".fit-img"))
            {
            	$box.fitImages();
            }
	   		
            if($box.is(".cover-img"))
            {
            	$box.coverImages();
            }*/

            if ($box.data("box-ratio")) {
                $box.parent().css("padding-bottom", ($box.data("box-ratio") * 100).toFixed(2) + "%");
                //fixMinHeight();
            }


            $box.waypoint({
                handler: function (direction) {
                    /*if($box.is(".fit-img"))
			   		{
			   			$box.fitImages();
			   		}
			   		
			   		if($box.is(".cover-img"))
			   		{
			   			$box.coverImages();
			   		}*/

                    $box.loadImage();
                    this.destroy();
                },
                offset: "125%"
            });
        });
    }


    // Init

    windowWidth = $(window).width();

    if (windowWidth >= 768) {
        if ($("#layout").length)
            $("#layout").initHome();
        else
            $("#slider").initSlider();
    } else {
        /*if($("#layout").length)
        	mobileIntro();*/
        $html.removeClass("intro-animation");

        loadImages();
    }

    handleResize(false);



    // Handle scroll

    // Scroll interval

    if (!hasMouse) {
        $(window).on("touchmove", function (e) {
            isScrolling = true;
            Waypoint.refreshAll();

            if (windowWidth >= 768) {
                e.preventDefault();
            }
        });

        // Touch overflow fix
        var scrolling = false;

        $body.on("touchstart", ".scroll-container", function (e) {
            if (!scrolling) {
                scrolling = true;

                if (e.currentTarget.scrollTop === 0) {
                    e.currentTarget.scrollTop = 1;
                } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
                    e.currentTarget.scrollTop -= 1;
                }

                scrolling = false;
            }
        });

        $body.on("touchmove", ".hidden-scroller .scroll-container", function (e) {
            if ($body.is(".about-open"))
                e.stopPropagation();

            Waypoint.refreshAll();
        });

        $body.on("touchmove", ".scroller .scroll-container", function (e) {
            e.stopPropagation();
            Waypoint.refreshAll();
        });

        $(window).on("touchend", function (e) {
            isScrolling = true;
            Waypoint.refreshAll();
        });

        $(window).on("scrollend", function (e) {
            Waypoint.refreshAll();

            setTimeout(function () {
                isScrolling = false;
            }, 0);
        });

        if (windowWidth < 768)
            $(window).on("scroll", function (e) {
                isScrolling = true;

                scrollTop = $(window).scrollTop();
            });
    } else {
        var timer;

        $(window).on("scrollstart", function (e) {
            isScrolling = true;
            prevScrollTop = $(window).scrollTop();
        });

        $(window).on("scroll", function (e) {
            isScrolling = true;

            scrollTop = $(window).scrollTop();

            if (windowWidth >= 768 && $body.is(".home")) {
                if (scrollTop > prevScrollTop) {
                    $("#layout").nextLeft();
                    $("#layout").nextRight();
                } else {
                    $("#layout").prevLeft();
                    $("#layout").prevRight();
                }
            }
        });
    }

    $(window).on("scrollend", function () {
        if (hasMouse)
            Waypoint.refreshAll();

        setTimeout(function () {
            isScrolling = false;
            noScrollOnce = false;
            forceMenu = false;
            prevScrollTop = $(window).scrollTop();
        }, 0);
    });

    if (hasMouse) {
        $(document).on("mouseenter", "#yulia, #hanyk", function () {
            $(this).addClass("hovered");
        });

        $(document).on("mouseleave", "#yulia, #hanyk", function () {
            $(this).removeClass("hovered");
        });
    }

    closeAbout = function () {
        var $left = $("#layout").data("sliderVars").currentLeft;
        var $right = $("#layout").data("sliderVars").currentRight;

        $left.transition({
            x: -Math.ceil(windowWidth / 2)
        }, 0).transition({
            x: 0,
            opacity: 1
        }, slideDuration, "easeInOutQuint");
        $right.transition({
            x: Math.ceil(windowWidth / 2)
        }, 0).transition({
            x: 0,
            opacity: 1
        }, slideDuration, "easeInOutQuint");

        $body.removeClass("force-white");

        $("#about").attr("style", "visibility: visible");

        $("#left-bg").transition({
            x: Math.ceil(windowWidth / 2)
        }, slideDuration * 9 / 10, "easeInOutQuint");
        $("#right-bg").transition({
            x: -Math.ceil(windowWidth / 2)
        }, slideDuration * 9 / 10, "easeInOutQuint");

        $("#about-text").transition({
            opacity: 0
        }, opacityDuration, easeInOut);

        $("#yulia").transition({
            x: Math.ceil(windowWidth / 2 - $("#yulia").width() - 39)
        }, slideDuration, "easeInOutQuint");
        $("#hanyk").transition({
            x: Math.ceil(-windowWidth / 2 + $("#hanyk").width() + 39)
        }, slideDuration, "easeInOutQuint");

        setTimeout(function () {
            $body.removeClass("about-open");
            $("#left-bg, #right-bg, #yulia, #hanyk, #about-text, #about").removeAttr("style");

            $left.removeAttr("style");
            $right.removeAttr("style");
            isAnimating = false;
        }, slideDuration * 3 / 2);
    }

    closeMobileAbout = function () {
        $("#about-text, #about-close").transition({
            opacity: 0
        }, opacityDuration, easeInOut, function () {
            $("#about").attr("style", "visibility: hidden");

            $body.removeClass("force-white");

            $("#yulia").transition({
                x: 50
            }, opacityDuration, "easeInOutQuint");
            $("#hanyk").transition({
                x: -50
            }, opacityDuration, "easeInOutQuint");

            $("#layout").attr("style", "visibility: visible; position: static;").transition({
                opacity: 1
            }, opacityDuration, easeInOut, function () {
                $body.removeClass("about-open");
                $("#layout, #about, #about-text, #yulia, #hanyk").removeAttr("style");
                isAnimating = false;
            });
        });
    }

    $(document).on("click", "#yulia, #hanyk", function () {

        if (!isAnimating) {
            $("#yulia, #hanyk").removeClass("hovered");
            isAnimating = true;

            if (windowWidth >= 768) {
                if (!$body.is(".about-open")) {
                    var $left = $("#layout").data("sliderVars").currentLeft;
                    var $right = $("#layout").data("sliderVars").currentRight;

                    $left.transition({
                        x: -Math.floor(windowWidth / 2),
                        opacity: 0
                    }, slideDuration, "easeInOutQuint");
                    $right.transition({
                        x: Math.floor(windowWidth / 2),
                        opacity: 0
                    }, slideDuration, "easeInOutQuint");

                    $("#about").attr("style", "visibility: visible");

                    $("#left-bg").transition({
                        x: -Math.floor(windowWidth / 2)
                    }, slideDuration, "easeInOutQuint");
                    $("#right-bg").transition({
                        x: Math.floor(windowWidth / 2)
                    }, slideDuration, "easeInOutQuint");

                    $("#about-text").transition({
                        opacity: 1,
                        delay: slideDuration / 2
                    }, opacityDuration, easeInOut);

                    $("#yulia").transition({
                        x: Math.floor(-windowWidth / 2 + $("#yulia").width() + 39)
                    }, slideDuration * 9 / 10, "easeInOutQuint");
                    $("#hanyk").transition({
                        x: Math.floor(windowWidth / 2 - $("#hanyk").width() - 39)
                    }, slideDuration * 9 / 10, "easeInOutQuint");

                    setTimeout(function () {
                        $body.addClass("force-white");
                    }, slideDuration / 2);

                    setTimeout(function () {
                        $body.addClass("about-open");
                        $("#left-bg, #right-bg, #yulia, #hanyk, #about-text, #about").removeAttr("style");
                        isAnimating = false;
                    }, slideDuration * 2);
                } else {
                    closeAbout();
                }
            } else {
                if (!$body.is(".about-open")) {
                    $("#yulia").transition({
                        x: -50
                    }, opacityDuration, "easeInOutQuint");
                    $("#hanyk").transition({
                        x: 50
                    }, opacityDuration, "easeInOutQuint");

                    $("#layout").transition({
                        opacity: 0
                    }, opacityDuration, easeInOut, function () {

                        $("#about").attr("style", "visibility: visible");
                        $("#about-text, #about-close").transition({
                            opacity: 1
                        }, opacityDuration, easeInOut, function () {
                            $body.addClass("about-open");
                            $("#layout, #about, #about-text, #about-close, #yulia, #hanyk").removeAttr("style");
                            isAnimating = false;
                        });
                    });
                } else {
                    closeMobileAbout();
                }
            }
        }
    });

    $(document).on("click", "#about a", function (e) {
        e.stopPropagation();
    });

    if (hasMouse) {
        $(document).on("click", "#about", function (e) {
            if ($body.is(".about-open")) {
                closeAbout();
            }
        });
    } else {
        $(document).on("click", "#about-close", function (e) {
            if ($body.is(".about-open")) {
                closeMobileAbout();
            }
        });
    }


    // Make external links open in new window

    addTargetBlank = function () {

        $("a[rel=external], a[href^='http:']:not([href*='" + window.location.host + "']), a[href^='https:']:not([href*='" + window.location.host + "'])").each(function () {
            $(this).attr("target", "_blank");
        });
    }

    addTargetBlank();

    $(document).on("click", ".external", function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();

        var newHref = $(this).attr("data-href");
        window.open(newHref, '_blank');
    });


    // AJAX nav

    var human = false;
    var historyPages = [];
    var ajaxInProgress = false;
    var ajaxHover = false;
    var fromArchive = false;
    var $clickedHalf;

    // Update history

    if (Modernizr.history && windowWidth >= 768) {
        updateHistory = function (href, title) {

            if (human) {
                var meta_title = "Atmospheric site";
                var page_title = title;

                if (page_title !== "Home" && page_title !== meta_title && page_title)
                    meta_title = page_title + " — " + meta_title;

                History.pushState({}, meta_title, href);

                var trackUrl = href.replace(baseURL, "");
                ga('send', 'pageview', {
                    'page': trackUrl,
                    'title': meta_title
                });
            }
        }

        $(document).on("click", ".external, a[href^='mailto']", function (e) {
            e.stopImmediatePropagation();
            e.stopPropagation();
        });

        /* Project Load */

        projectLoad = function (targetHref, targetTitle, halfID, currentIndex, targetIndex) {

            $clickedHalf = $("#" + halfID);
            var isRight = $clickedHalf.is(".right");

            if (!isRight)
                var $otherHalf = $("#layout").data("sliderVars").allRight.filter(".half.current");
            else
                var $otherHalf = $("#layout").data("sliderVars").allLeft.filter(".half.current");

            var $clicked = $clickedHalf.find(".img-holder").eq(0);
            var $clickedImg = $clicked.find(".big-img");

            $body.append('<div id="clone" class="clone"></div>');
            $html.addClass("loading");

            $("#clone").attr("style", "width: " + $clickedImg.width() + "px; height: " + $clickedImg.height() + "px; left: " + $clickedImg.offset().left + "px; top: " + $clickedImg.offset().top + "px;").append($clickedImg.clone().removeAttr("style"));
            $clickedHalf.attr("style", "visibility: hidden");

            $otherHalf.transition({
                opacity: 0
            }, slideDuration / 2, easeInOut);

            $("yulia-hanyk").transition({
                x: $("#yulia-mask").width()
            }, slideDuration * 3 / 4, "easeInOutQuint");
            $("#-mask").transition({
                x: -$("#hanyk-mask").width()
            }, slideDuration * 3 / 4, "easeInOutQuint");

            $('<div></div>').load(targetHref + "?ajax=1 #project", function (response, status) {

                if (status !== "error") {
                    var $newContent = $(this).children();

                    $body.attr("class", $newContent.data("body-class"));
                    $body.append($newContent.attr("style", "opacity: 0"));

                    $("#yulia-mask, #hanyk-mask").removeAttr("style");

                    imageReady = false;

                    $("#slider").initSlider({
                        slideIndex: currentIndex,
                        targetIndex: targetIndex,
                        isRight: isRight
                    });
                    $("#single").addClass("no-transition");

                    if (isRight)
                        $("#project").addClass("right-project");

                    handleResize(false);

                    addTargetBlank();

                    updateHistory(targetHref, targetTitle);

                    if (currentIndex !== targetIndex) {
                        $("#thumb-1").removeClass("current");
                        $("#thumb-" + currentIndex).addClass("current");
                        $("#caption, #thumbs, #close").attr("style", "opacity: 0");
                    }

                    showSlider = function () {

                        if (imageReady) {
                            $("#project").transition({
                                opacity: 1
                            }, slideDuration / 2, easeInOut, function () {

                                $("#clone").unLoadImages().empty().remove();
                                $("#single").removeClass("no-transition");
                                $clickedHalf.attr("style", "visibility: hidden; opacity: 0");
                                $otherHalf.attr("style", "visibility: hidden; opacity: 0");

                                if (currentIndex !== targetIndex) {
                                    $("#thumb-" + targetIndex).trigger("click", true);

                                    setTimeout(function () {
                                        $html.removeClass("loading");
                                    }, slideDuration);

                                    if (currentIndex !== targetIndex)
                                        setTimeout(function () {
                                            $("#thumbs, #close").transition({
                                                opacity: 1
                                            }, slideDuration / 2, easeInOut).promise().done(function () {
                                                $("#thumbs, #close").removeAttr("style");
                                            });
                                        }, slideDuration / 2);
                                } else {
                                    $html.removeClass("loading");
                                }

                                ajaxInProgress = false;
                                imageReady = false;
                            });
                        } else {
                            setTimeout(showSlider, 50);
                        }
                    }

                    var $targetImg = $("#slide-" + currentIndex).find(".big-img");
                    /*var $targetParent = $targetImg.parent();
                    console.log($targetParent.height());*/

                    setTimeout(function () {
                        $("#clone").transition({
                            x: $targetImg.offset().left - $("#clone").offset().left,
                            y: $targetImg.offset().top - $("#clone").offset().top,
                            scale: $targetImg.height() / $("#clone").height()
                        }, slideDuration * 3 / 4, "easeInOutQuint", function () {
                            showSlider();
                        });
                    }, 50);
                } else {
                    ajaxInProgress = false;
                }
            });
        }

        if (hasMouse) {
            $(document).on("click", "#layout a", function (e, fakeClick) {
//                e.preventDefault();

                e.stopImmediatePropagation();
                e.stopPropagation();

                var $clickedLink = $(this);

                if (!ajaxInProgress) {
                    ajaxInProgress = true;

                    if (e.originalEvent || fakeClick) {
                        human = true;
                    }

                    var targetHref = $clickedLink.attr("href");
                    var targetTitle = $clickedLink.data("title");
                    var $half = $clickedLink.parents(".half");
                    var halfID = $clickedLink.parents(".half").attr("id");
                    var targetIndex = $clickedLink.data("index");
                    var currentIndex = targetIndex;

                    if (!$clickedLink.is(".current"))
                        currentIndex = $half.find(".current").data("index");

                    projectLoad(targetHref, targetTitle, halfID, currentIndex, targetIndex);
                }
            });
        } else {
            $(document).on("click", "#layout .img-holder", function (e, fakeClick) {
                e.preventDefault();

                e.stopImmediatePropagation();
                e.stopPropagation();

                var $clickedLink = $(this).find("a").eq(0);

                if (!ajaxInProgress) {
                    ajaxInProgress = true;

                    if (e.originalEvent || fakeClick) {
                        human = true;
                    }

                    var targetHref = $clickedLink.attr("href");
                    var targetTitle = $clickedLink.data("title");
                    var $half = $clickedLink.parents(".half");
                    var halfID = $clickedLink.parents(".half").attr("id");
                    var targetIndex = $clickedLink.data("index");
                    var currentIndex = targetIndex;

                    if (!$clickedLink.is(".current"))
                        currentIndex = $half.find(".current").data("index");

                    projectLoad(targetHref, targetTitle, halfID, currentIndex, targetIndex);
                }
            });
        }

        /* Project Close */

        projectClose = function (targetHref, targetTitle, halfID, currentIndex, targetIndex) {

            var isRight = $clickedHalf.is(".right");
            var extraDelay = 0;

            if (!isRight)
                var $otherHalf = $("#layout").data("sliderVars").allRight.filter(".half.current");
            else
                var $otherHalf = $("#layout").data("sliderVars").allLeft.filter(".half.current");

            if (currentIndex !== targetIndex) {
                $("#thumb-" + targetIndex).trigger("click", true);
                extraDelay = slideDuration + 50;
            }

            setTimeout(function () {

                currentIndex = targetIndex;
                var $clickedImg = $("#slide-" + currentIndex).find(".big-img");
                var $targetImg = $clickedHalf.find(".big-img");
                var $targetContainer = $targetImg.parent(".img-holder");

                $body.append('<div id="clone" class="clone close-clone"></div>');
                //$html.addClass("loading");

                $("#clone").attr("style", "width: " + $clickedImg.width() + "px; height: " + $clickedImg.height() + "px; left: " + $clickedImg.offset().left + "px; top: " + Math.floor($clickedImg.offset().top) + "px;").append($clickedImg.clone().removeAttr("style"));

                $clickedImg.attr("style", "visibility: hidden");
                $("#project").transition({
                    opacity: 0
                }, slideDuration / 2, easeInOut);

                $("#clone").transition({
                    x: $targetImg.offset().left - $("#clone").offset().left,
                    y: $targetImg.offset().top - $("#clone").offset().top,
                    scale: $targetImg.height() / $("#clone").height()
                }, slideDuration * 3 / 4, "easeInOutQuint", function () {

                    updateHistory(targetHref, targetTitle);

                    $("#yulia, #hanyk").attr("style", "visibility: visible; opacity: 1");

                    $("#yulia-mask").transition({
                        x: -$("#yulia-mask").width()
                    }, slideDuration * 3 / 4, "easeInOutQuint");
                    $("#hanyk-mask").transition({
                        x: $("#hanyk-mask").width()
                    }, slideDuration * 3 / 4, "easeInOutQuint", function () {
                        $body.attr("class", $("#ajax").data("body-class"));
                        $clickedHalf.removeAttr("style");
                        $otherHalf.removeAttr("style");
                        $("#yulia-mask, #hanyk-mask").removeAttr("style");
                        $("#project, #clone").unLoadImages().empty().remove();

                        //$html.removeClass("loading");
                        ajaxInProgress = false;
                    });

                    $otherHalf.attr("style", "opacity: 0").transition({
                        opacity: 1
                    }, slideDuration / 2, easeInOut);
                });
            }, extraDelay);
        }

        $(document).on("click", "#layout a", function (e, fakeClick) {
            e.preventDefault();

            e.stopImmediatePropagation();
            e.stopPropagation();

            var $clickedLink = $(this);

            if (!ajaxInProgress) {
                ajaxInProgress = true;

                if (e.originalEvent || fakeClick) {
                    human = true;
                }

                var targetHref = $clickedLink.attr("href");
                var targetTitle = $clickedLink.data("title");
                var $half = $clickedLink.parents(".half");
                var halfID = $clickedLink.parents(".half").attr("id");
                var targetIndex = $clickedLink.data("index");
                var currentIndex = targetIndex;

                $clickedHalf = $half;

                if (!$clickedLink.is(".current"))
                    currentIndex = $half.find(".current").data("index");

                projectLoad(targetHref, targetTitle, halfID, currentIndex, targetIndex);
            }
        });

        if ($body.is(".home"))
            $(document).on("click", "#close", function (e, fakeClick) {
                e.preventDefault();
                e.stopPropagation();

                var $clickedLink = $(this);

                if (!ajaxInProgress) {
                    ajaxInProgress = true;

                    if (e.originalEvent || fakeClick) {
                        human = true;
                    }

                    var targetHref = $clickedLink.attr("href");
                    var targetTitle = $clickedLink.data("title");
                    var $half = $clickedHalf;
                    var halfID = $half.attr("id");
                    var targetIndex = $half.find(".current").data("index");
                    var currentIndex = $("#slider").data("sliderVars").currentSlide.data("index");

                    projectClose(targetHref, targetTitle, halfID, currentIndex, targetIndex);
                }
            });

        // History navigation

        History.Adapter.bind(window, 'statechange', function () {
            var State = History.getState();

            if (!human) {
                if (!ajaxInProgress) {
                    var $historyLink = $body.find('a[href$="' + State.url + '"]').last();

                    if ($historyLink.length)
                        $historyLink.trigger("click");
                    else
                        window.location.reload();
                }
            } else {
                setTimeout(function () {
                    human = false;
                }, 100);
            }
        });
    }


    if (windowWidth < 768) {
        $(document).on("click", "#layout .half", function () {
            window.location.href = $(this).data("href");
        });

        $(document).on("click", "#close", function (e) {

            if (document.referrer.indexOf("yuliahanyk") != -1) {
                e.preventDefault();
                window.history.back();
            }
        });
    }



    $(document).on("click", "#layout", function (e) {
        
//        e.preventDefault();
//        e.stopPropagation();
        

        if (!$html.is(".intro-animation")) {
            if (!$html.is(".sliding"))
                $html.addClass("sliding");

            if (e.pageX <= windowWidth / 3) {
                if (e.pageY < windowHeight / 2)
                    $("#layout").prevLeft();
                else
                    $("#layout").nextLeft();
            } else if (e.pageX > windowWidth / 3 && e.pageX < windowWidth / 3 * 2) {
                if (e.pageY < windowHeight / 2) {
                    $("#layout").nextLeft();
                    $("#layout").nextRight();
                } else {
                    $("#layout").prevLeft();
                    $("#layout").prevRight();
                }
            } else {
                if (e.pageY < windowHeight / 2)
                    $("#layout").nextRight();
                else
                    $("#layout").prevRight();
            }
        }
    });

    if (hasMouse && windowWidth >= 768) {
        $(document).on("mousewheel", function (e, delta) {


            if ($body.is(".home") && !$body.is(".about-open") && noWheel == false && !isAnimating && !ajaxInProgress && !$body.is(".single-work") && !$html.is(".intro-animation")) {
                e.preventDefault();

                if ($("#layout").data("sliderVars").isAnimatingLeft == false && $("#layout").data("sliderVars").isAnimatingRight == false) {
                    noWheel = true;

                    if (!$html.is(".sliding"))
                        $html.addClass("sliding");

                    if (e.pageX <= windowWidth / 3) {
                        if (delta > 0)
                            $("#layout").prevLeft();
                        else
                            $("#layout").nextLeft();
                    } else if (e.pageX > windowWidth / 3 && e.pageX < windowWidth / 3 * 2) {
                        if (delta > 0) {
                            $("#layout").nextLeft();
                            $("#layout").nextRight();
                        } else {
                            $("#layout").prevLeft();
                            $("#layout").prevRight();
                        }
                    } else {
                        if (delta > 0)
                            $("#layout").nextRight();
                        else
                            $("#layout").prevRight();
                    }

                    setTimeout(function () {
                        noWheel = false;
                    }, slideDuration + 500);
                }
            } else if ($body.is(".single-work") && noWheel == false && !isAnimating) {
                e.preventDefault();

                noWheel = true;

                if (delta > 0) {
                    $("#slider").nextSlide();
                } else {
                    $("#slider").prevSlide();
                }

                setTimeout(function () {
                    noWheel = false;
                }, slideDuration + 500);
            }
        });

        $(document).on("mouseenter", "#layout .img-holder, #single .bg", function () {
            $body.addClass("white-cursors");
        });

        $(document).on("mouseleave", "#layout .img-holder, #single .bg", function () {
            $body.removeClass("white-cursors");
        });

        // Handle keyboard navigation

        $(document).keydown(function (e) {
            var isSingle = $body.is(".single-work");
            var isHome = $body.is(".home");
            var aboutOpen = $body.is(".about-open");
            var introAnimation = $html.is(".intro-animation");

            switch (e.keyCode) {
                case 39:
                    // RIGHT

                    if (isSingle) {
                        e.preventDefault();
                        $("#slider").nextSlide();
                    }
                    break;
                case 37:
                    // LEFT

                    if (isSingle) {
                        e.preventDefault();
                        $("#slider").prevSlide();
                    }
                    break;
                case 38:
                    // UP

                    if (isHome && !aboutOpen && !isAnimating && !ajaxInProgress && !introAnimation) {
                        e.preventDefault();
                        $("#layout").nextLeft();
                        $("#layout").nextRight();
                    }

                    break;
                case 40:
                    // DOWN

                    if (isHome && !aboutOpen && !isAnimating && !ajaxInProgress && !introAnimation) {
                        e.preventDefault();
                        $("#layout").prevLeft();
                        $("#layout").prevRight();
                    }

                    break;
                case 27:
                    // ESC

                    if (isSingle) {
                        human = true;

                        $("#close").trigger("click");
                    } else if ($body.is(".about-open")) {
                        $("#yulia").trigger("click");
                    }

                    break;
                case 32:
                    // Spacebar

                    break;
            }
        });
    }
});

$(window).load(function () {

    pageLoaded = true;

    setTimeout(function () {
        Waypoint.refreshAll();
    }, 150);
});

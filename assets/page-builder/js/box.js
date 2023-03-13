$(document).ready(function (e) {

    $('.is-arrow-down a').click(function (e) {
        if ($(this).parents(".is-section").nextAll('div:not(.is-hidden)').html()) { /* .hidden class can be used as an exception */
            $('html,body').animate({
                scrollTop: $(this).parents(".is-section").nextAll('div:not(.is-hidden)').offset().top - parseInt($('.is-wrapper').css('padding-top')) /* + 1 Adjustment due to topbar height*/
            }, 800);
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    });

    $('.is-wrapper > div:first-child').find('.is-scale-animated').addClass('is-appeared');

    $('.is-scale-animated').appear();
    $('.is-scale-animated').on('appear', function () {
        $(this).addClass('is-appeared');
    });
    $('.is-scale-animated').on('disappear', function () {
        $(this).removeClass('is-appeared');
    });

    //Hide all animated elements first
    $('.is-animated').each(function () {
        $(this).addClass('animated');
        $(this).addClass('fadeOut');
    });


    /* Animate Section/Boxes */
    $('.is-section').appear();
    $('.is-section').each(function () {
        if ($(this).is(':appeared')) {
            applyAnimationSection($(this));
        }
    });
    if ($(window).scrollTop() == 0) {//on editing, appear not triggered on first load (on top only). This is the fix.
        setTimeout(applyAnimationSection($('.is-section').first()), 2000);
    }
    $('.is-section').on('appear', function () {
        applyAnimationSection($(this));
    });
    $('.is-section').on('disappear', function () {
        removeAnimationSection($(this));
    });


    /* Animate Content/Container */
    $('.is-container').appear();    
    $('.is-container').each(function () {
        if ($(this).is(':appeared')) {
            applyAnimation($(this));
        }
    });
    if ($(window).scrollTop() == 0) {//on editing, appear not triggered on first load (on top only). This is the fix.
        $('.is-section').first().find('.is-container').each(function () {
            setTimeout(applyAnimation($(this)), 2000);
        });
    }
    $('.is-container').on('appear', function () {
        applyAnimation($(this));
    });
    $('.is-container').on('disappear', function () {
        removeAnimation($(this));
    });

});

function applyAnimation($root) {
    var n = 0;
    $root.find('.is-animated').each(function () {

        if ($(this).data('animated') != 'done') {

            if (n > 0) $(this).css('animation-delay', n + 's');
            n = n + 0.2;

            $(this).removeClass('fadeOut');

            if ($(this).hasClass('is-pulse')) $(this).addClass('pulse');
            if ($(this).hasClass('is-bounceIn')) $(this).addClass('bounceIn');
            if ($(this).hasClass('is-fadeIn')) $(this).addClass('fadeIn');
            if ($(this).hasClass('is-fadeInDown')) $(this).addClass('fadeInDown');
            if ($(this).hasClass('is-fadeInLeft')) $(this).addClass('fadeInLeft');
            if ($(this).hasClass('is-fadeInRight')) $(this).addClass('fadeInRight');
            if ($(this).hasClass('is-fadeInUp')) $(this).addClass('fadeInUp');
            if ($(this).hasClass('is-flipInX')) $(this).addClass('flipInX');
            if ($(this).hasClass('is-flipInY')) $(this).addClass('flipInY');
            if ($(this).hasClass('is-slideInUp')) $(this).addClass('slideInUp');
            if ($(this).hasClass('is-slideInDown')) $(this).addClass('slideInDown');
            if ($(this).hasClass('is-slideInLeft')) $(this).addClass('slideInLeft');
            if ($(this).hasClass('is-slideInRight')) $(this).addClass('slideInRight');
            if ($(this).hasClass('is-zoomIn')) $(this).addClass('zoomIn');

            if ($(this).hasClass('once')) $(this).data('animated', 'done');
        }

    });
}

function removeAnimation($root) {
    $root.find('.is-animated').each(function () {

        //$(this).removeClass('animated');
        $(this).removeClass('pulse');
        $(this).removeClass('bounceIn');
        $(this).removeClass('fadeIn');
        $(this).removeClass('fadeInDown');
        $(this).removeClass('fadeInLeft');
        $(this).removeClass('fadeInRight');
        $(this).removeClass('fadeInUp');
        $(this).removeClass('flipInX');
        $(this).removeClass('flipInY');
        $(this).removeClass('slideInUp');
        $(this).removeClass('slideInDown');
        $(this).removeClass('slideInLeft');
        $(this).removeClass('slideInRight');
        $(this).removeClass('zoomIn');

        if (!$(this).hasClass('once')) {
            $(this).addClass('fadeOut');
        }
    });
}


function applyAnimationSection($section) {
    /*
    try {
        var s = $('.is-wrapper').data('contentbox').settings;
        //return;
    } catch (e) { }
    */

    var n = 0;

    if ($section.hasClass('is-animated')) {

        if ($section.data('animated') != 'done') {

            if(n>0) $section.css('animation-delay', n + 's');
            n = n + 0.2;

            $section.removeClass('fadeOut');

            if ($section.hasClass('is-pulse')) $section.addClass('pulse');
            if ($section.hasClass('is-bounceIn')) $section.addClass('bounceIn');
            if ($section.hasClass('is-fadeIn')) $section.addClass('fadeIn');
            if ($section.hasClass('is-fadeInDown')) $section.addClass('fadeInDown');
            if ($section.hasClass('is-fadeInLeft')) $section.addClass('fadeInLeft');
            if ($section.hasClass('is-fadeInRight')) $section.addClass('fadeInRight');
            if ($section.hasClass('is-fadeInUp')) $section.addClass('fadeInUp');
            if ($section.hasClass('is-flipInX')) $section.addClass('flipInX');
            if ($section.hasClass('is-flipInY')) $section.addClass('flipInY');
            if ($section.hasClass('is-slideInUp')) $section.addClass('slideInUp');
            if ($section.hasClass('is-slideInDown')) $section.addClass('slideInDown');
            if ($section.hasClass('is-slideInLeft')) $section.addClass('slideInLeft');
            if ($section.hasClass('is-slideInRight')) $section.addClass('slideInRight');
            if ($section.hasClass('is-zoomIn')) $section.addClass('zoomIn');

            if ($section.hasClass('once')) $section.data('animated', 'done');
           
        }
    }
    /*
    $section.find('.is-box.is-animated').each(function () {

        if ($(this).data('animated') != 'done') {

            if(n>0) $(this).css('animation-delay', n + 's');
            n = n + 0.2;

            $(this).removeClass('fadeOut');

            if ($(this).hasClass('is-pulse')) $(this).addClass('pulse');
            if ($(this).hasClass('is-bounceIn')) $(this).addClass('bounceIn');
            if ($(this).hasClass('is-fadeIn')) $(this).addClass('fadeIn');
            if ($(this).hasClass('is-fadeInDown')) $(this).addClass('fadeInDown');
            if ($(this).hasClass('is-fadeInLeft')) $(this).addClass('fadeInLeft');
            if ($(this).hasClass('is-fadeInRight')) $(this).addClass('fadeInRight');
            if ($(this).hasClass('is-fadeInUp')) $(this).addClass('fadeInUp');
            if ($(this).hasClass('is-flipInX')) $(this).addClass('flipInX');
            if ($(this).hasClass('is-flipInY')) $(this).addClass('flipInY');
            if ($(this).hasClass('is-slideInUp')) $(this).addClass('slideInUp');
            if ($(this).hasClass('is-slideInDown')) $(this).addClass('slideInDown');
            if ($(this).hasClass('is-slideInLeft')) $(this).addClass('slideInLeft');
            if ($(this).hasClass('is-slideInRight')) $(this).addClass('slideInRight');
            if ($(this).hasClass('is-zoomIn')) $(this).addClass('zoomIn');

            if ($(this).hasClass('once')) $(this).data('animated', 'done');
        }
    });*/
}

function removeAnimationSection($section) {

    if ($section.hasClass('is-animated')) {

        $section.removeClass('pulse');
        $section.removeClass('bounceIn');
        $section.removeClass('fadeIn');
        $section.removeClass('fadeInDown');
        $section.removeClass('fadeInLeft');
        $section.removeClass('fadeInRight');
        $section.removeClass('fadeInUp');
        $section.removeClass('flipInX');
        $section.removeClass('flipInY');
        $section.removeClass('slideInUp');
        $section.removeClass('slideInDown');
        $section.removeClass('slideInLeft');
        $section.removeClass('slideInRight');
        $section.removeClass('zoomIn');

        if (!$section.hasClass('once')) {
            $section.addClass('fadeOut');
        }
    }

    $section.find('.is-animated').each(function () {

        $(this).removeClass('pulse');
        $(this).removeClass('bounceIn');
        $(this).removeClass('fadeIn');
        $(this).removeClass('fadeInDown');
        $(this).removeClass('fadeInLeft');
        $(this).removeClass('fadeInRight');
        $(this).removeClass('fadeInUp');
        $(this).removeClass('flipInX');
        $(this).removeClass('flipInY');
        $(this).removeClass('slideInUp');
        $(this).removeClass('slideInDown');
        $(this).removeClass('slideInLeft');
        $(this).removeClass('slideInRight');
        $(this).removeClass('zoomIn');

        if (!$(this).hasClass('once')) {
            $(this).addClass('fadeOut');
        }

    });

}


/*
//How to use:
//on body load, call: demo($('.is-wrapper > div:first-child'))");
var $activeSect;
function demo($section) {
setTimeout(function () {
$activeSect = $section;
$('html,body').animate({
scrollTop: $activeSect.offset().top
}, 700, function () {
if ($activeSect.next().html()) {
demo($activeSect.next());
return false;
}
});        
}, 700);
}
*/


/*
* jQuery appear plugin
*
* Copyright (c) 2012 Andrey Sidorov
* licensed under MIT license.
*
* https://github.com/morr/jquery.appear/
*
* Version: 0.3.6
*/
(function ($) {
    var selectors = [];

    var check_binded = false;
    var check_lock = false;
    var defaults = {
        interval: 250,
        force_process: false
    };
    var $window = $(window);

    var $prior_appeared = [];

    function process() {
        check_lock = false;
        for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
            var $appeared = $(selectors[index]).filter(function () {
                return $(this).is(':appeared');
            });

            $appeared.trigger('appear', [$appeared]);

            if ($prior_appeared[index]) {
                var $disappeared = $prior_appeared[index].not($appeared);
                $disappeared.trigger('disappear', [$disappeared]);
            }
            $prior_appeared[index] = $appeared;
        }
    };

    function add_selector(selector) {
        selectors.push(selector);
        $prior_appeared.push();
    }

    // "appeared" custom filter
    $.expr[':']['appeared'] = function (element) {
        var $element = $(element);
        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $window.scrollLeft();
        var window_top = $window.scrollTop();
        var offset = $element.offset();
        var left = offset.left;
        var top = offset.top;

        if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() - 200 && /* - 200 (custom) */
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
            return true;
        } else {
            return false;
        }
    };

    $.fn.extend({
        // watching for element's appearance in browser viewport
        appear: function (options) {
            var opts = $.extend({}, defaults, options || {});
            var selector = this.selector || this;
            if (!check_binded) {
                var on_check = function () {
                    if (check_lock) {
                        return;
                    }
                    check_lock = true;

                    setTimeout(process, opts.interval);
                };

                $(window).scroll(on_check).resize(on_check);
                check_binded = true;
            }

            if (opts.force_process) {
                setTimeout(process, opts.interval);
            }
            add_selector(selector);
            return $(selector);
        }
    });

    $.extend({
        // force elements's appearance check
        force_appear: function () {
            if (check_binded) {
                process();
                return true;
            }
            return false;
        }
    });
})(function () {
    if (typeof module !== 'undefined') {
        // Node
        return require('jquery');
    } else {
        return jQuery;
    }
} ());

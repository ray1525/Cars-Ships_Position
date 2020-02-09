'use strict';

$('.shape').on('mouseenter touchstart', function () {
    $(this).children('img').attr('src', $(this).children('img').attr('data-img-file'));
    $(this).removeClass('img-hidden');
    $(this).addClass('img-visible');
});

$('#main').on('mouseenter touchstart', function () {
    $('.shape').removeClass('img-visible');
    $('.shape').addClass('img-hidden');
});

$('body').mousemove(function (event) {
    console.log(`left: ${event.pageX-4}px; top: ${event.pageY-4}px;`);
});

/*let lastMainW = 1237;
const fixPosition = function () {
    let mainW = $('#main').width();
    // let winH = $(window).height();
    // if(mainW < winH){
    //    $('#main').width(winH);
    // } else {
    //     $('#main').width($(window).width());
    // }
    $('.shape').each(function() {
        const thisTop = parseFloat($(this).css('top').split('px')[0]);
        const fixedTop = thisTop * mainW / lastMainW;
        const thisLeft = parseFloat($(this).css('left').split('px')[0]);
        const fixedLeft = thisLeft * mainW / lastMainW;
        $(this).css('top', `${fixedTop}px`);
        $(this).css('left', `${fixedLeft}px`);
    });
    lastMainW = mainW;
};
fixPosition();

$(window).resize(function () {
    fixPosition();
});
*/
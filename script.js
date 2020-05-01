'use strict';

const url = window.URL || window.webkitURL;
const shapeSize = $('.shape').width();
const closeAll = function(){
    $('.img-visible').each(function(){
        if($(this).children('img').length === 0){
            $(this).next().insertAfter($(this).children('div'));
        }
        $(this).removeClass('img-visible');
        $(this).addClass('img-hidden');
    });
};

$('.shape').on('mouseenter touchstart', function () {
    closeAll();
    // $(this).children('img').attr('src', $(this).children('img').attr('data-img-file'));
    const thisTop = parseFloat($(this).css('top').split('px')[0]);
    const thisLeft = parseFloat($(this).css('left').split('px')[0]);
    const thisHeight = $(this).children('img').height() + shapeSize;
    const thisWidth = $(this).children('img').width();

    if(thisTop > 618 && thisLeft < 618){
        $(this).children('img').insertAfter($(this));
        $(this).next().width(thisWidth);
        $(this).next().height(thisHeight - shapeSize);
        $(this).next().css('position', 'absolute');
        $(this).next().css('left', `${thisLeft}px`);
        $(this).next().css('top', `${thisTop - thisHeight + shapeSize}px`);
    }
    if(thisTop > 618 && thisLeft > 618){
        $(this).children('img').insertAfter($(this));
        $(this).next().width(thisWidth);
        $(this).next().height(thisHeight - shapeSize);
        $(this).next().css('position', 'absolute');
        $(this).next().css('left', `${thisLeft - thisWidth}px`);
        $(this).next().css('top', `${thisTop - thisHeight + shapeSize}px`);
    }
    if(thisTop < 618 && thisLeft > 618){
        $(this).children('img').insertAfter($(this));
        $(this).next().width(thisWidth);
        $(this).next().height(thisHeight - shapeSize);
        $(this).next().css('position', 'absolute');
        $(this).next().css('left', `${thisLeft - thisWidth}px`);
        $(this).next().css('top', `${thisTop}px`);
    }

    $(this).removeClass('img-hidden');
    $(this).addClass('img-visible');
});

$('#main').on('mouseenter touchstart', function () {
    closeAll();
});

$('body').mousemove(function (event) {
    // console.log(`left: ${event.pageX-4}px; top: ${event.pageY-4}px;`);
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

const loadBinaryImage = function(path, i, cb) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            cb(this.response, i);
        }
    }
    xhr.open('GET', path);
    xhr.responseType = 'blob';
    xhr.send();
}

let count = 0;
let progress = 0;

$('.shape').each(function (i) {
    loadBinaryImage($(this).children('img').attr('data-img'), i, function(data, i) {
        $('.shape').eq(i).children('img').attr('src', url.createObjectURL(data));
        count++;
        progress = count / $('.shape').length * 100;
        progress = Math.round(progress * 10) / 10;
        $('#progress').text(progress);
        if(progress === 100){
            $('#main').css('display', 'block');
            $('.shape').css('display', 'block');
            $('#progressArea').hide();
        }
    });
});

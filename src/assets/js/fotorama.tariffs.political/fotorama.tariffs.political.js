$(function () {
  $('.fotorama__tariffs-political').fotorama({
    width: '100%',
    maxwidth: '100%',
    ratio: 4/3,
    allowfullscreen: false,
    nav: 'thumbs',
    navwidth: '100%',
    autoplay: true,
    stopautoplayontouch: true,
    loop: true,
    thumbwidth: 101,
    thumbheight: 101,
    thumbmargin: 30,
    transition: 'crossfade',
    arrows: true
  });
});

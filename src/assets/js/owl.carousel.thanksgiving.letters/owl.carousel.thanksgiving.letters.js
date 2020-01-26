$(function () {
  var leftArrond = '<a class="button button__round button__round_big button__round_gold-border button__round_animation-left" title="" role="button"><svg width="23" height="17" viewbox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.51207 0.24322C7.8254 -0.0810734 8.3469 -0.0810734 8.6712 0.24322C8.98453 0.556558 8.98453 1.07806 8.6712 1.39066L2.79374 7.26812H22.1885C22.6406 7.26885 23 7.6282 23 8.08031C23 8.53242 22.6406 8.90346 22.1885 8.90346H2.79374L8.6712 14.77C8.98453 15.0943 8.98453 15.6165 8.6712 15.9291C8.3469 16.2534 7.82467 16.2534 7.51207 15.9291L0.24322 8.66024C-0.0810733 8.3469 -0.0810733 7.82541 0.24322 7.5128L7.51207 0.24322Z" fill="#C5A47E"></path></svg></a>';
  var rightArrond = '<a class="button button__round button__round_big button__round_gold-border button__round_animation-right" title="" role="button"><svg width="23" height="17" viewbox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4879 0.24322C15.1746 -0.0810734 14.6531 -0.0810734 14.3288 0.24322C14.0155 0.556558 14.0155 1.07806 14.3288 1.39066L20.2063 7.26812H0.811464C0.359352 7.26885 0 7.6282 0 8.08031C0 8.53242 0.359352 8.90346 0.811464 8.90346H20.2063L14.3288 14.77C14.0155 15.0943 14.0155 15.6165 14.3288 15.9291C14.6531 16.2534 15.1753 16.2534 15.4879 15.9291L22.7568 8.66024C23.0811 8.3469 23.0811 7.82541 22.7568 7.5128L15.4879 0.24322Z" fill="#C5A47E"></path></svg></a>';
  $('.owl-carousel__thanksgiving-letters').owlCarousel({
    items: 5,
    loop: true,
    dots: true,
    nav: true,
    margin: 30,
    stagePadding: 15,
    center: false,
    autoWidth: false,
    mouseDrag: true,
    navElement: 'div',
    navText: [leftArrond, rightArrond],
    autoplay: false,
    autoplayHoverPause: true,
    smartSpeed: 600,
    touchDrag: true,
    responsive: {
      0: {
        items: 1,
        dots: false
      },
      500: {
        items: 2
      },
      1000: {
        items: 3
      },
      1200: {
        items: 4
      },
      1680: {
        items: 4
      },
      1700: {
        items: 5
      },
      1920: {
        items: 5
      }
    }
  })
});


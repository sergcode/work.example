"use strict";

(function ($) {

  const SCROLLING_NAVBAR_OFFSET_TOP = 50;

  $(window).on("scroll", () => {

    const $navbar = $(".header");

    if ($navbar.length) {

      if ($navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP) {

        $(".scrolling-navbar").addClass("top-nav-collapse");

      } else {

        $(".scrolling-navbar").removeClass("top-nav-collapse");

      }

    }

  });

}(jQuery));


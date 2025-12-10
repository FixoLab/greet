/**
 * Table of contents
 * -----------------------------------
 * 1.HEADER STICKY
 * 2.HEADER ACTIVE ADD CLASS
 * 3.HEADER COLLAPSE
 * 4.FIXED HEADER
 * 5.ODOMETER JS
 * 6.TESTIMONIAL SLIDER
 * 7.SERVICE SLIDER
 * 8.AJAX MAILCHIMP SUBSCRIBE
 * 9.LOCAL SUBSCRIPTION
 * 10.SMOOTH SCROLL ON BUTTON CLICK
 * DARK VERSION
 */

(function ($) {
  "use strict";
  var PATH = {};

  /******************** 1.HEADER STICKY ********************/
  PATH.HeaderSticky = function () {
    $(".navbar-toggler").on("click", function (a) {
      a.preventDefault(), $(".navbar").addClass("navbar_fixed");
    });
  };

  /******************** 2.HEADER ACTIVE ADD CLASS ********************/
  PATH.HeaderOnePageNav = function () {
    $(".scroll").onePgaeNav({
      activeClass: "active",
      wrapper: "#onepage-nav",
      navStop: 60,
      navStart: 70,
    });
  };

  /******************** 3.HEADER COLLAPSE ********************/
  PATH.MenuClose = function () {
    $(".navbar-nav li").on("click", function () {
      var toggle = $(".navbar-toggler").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse("hide");
      }
    });
  };

  /******************** 4.FIXED HEADER ********************/
  PATH.HeaderFixed = function () {
    var varHeaderFix = $(window).scrollTop() >= 60,
      $navbar = $(".header");
    if (varHeaderFix) {
      $navbar.addClass("navbar_fixed");
    } else {
      $navbar.removeClass("navbar_fixed");
    }
  };



  /******************** 6.TESTIMONIAL SLIDER  ********************/
  PATH.TestimonialSlide = function () {
    new Swiper(".testimonialSlider", {
      spaceBetween: 18,
      loop: true,

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  };

  /******************** 7.SERVICE SLIDER  ********************/
  PATH.ServiceSlide = function () {
    new Swiper(".service-slider", {
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
      },
    });
  };

  /******************** 8.AJAX MAILCHIMP SUBSCRIBE ********************/
  PATH.AjaxChimp = function () {
    $("#subscribe-mailchimp").ajaxChimp({
      callback: mailchimpCallback,
      url: "http://eepurl.com/h9OxWf", // Replace your mailchimp post url inside double quote "".
    });

    function mailchimpCallback(resp) {
      var error_msg = $("#subscribe-mailchimp").find(".error-msg");
      var success_msg = $("#subscribe-mailchimp").find(".success-msg");

      if (resp.result === "success") {
        error_msg.fadeOut(200);
        success_msg.html(resp.msg).fadeIn(200);
      } else if (resp.result === "error") {
        success_msg.fadeOut(200);
        error_msg.html(resp.msg).fadeIn(200);
      }
    }
  };

  /******************** 9.LOCAL SUBSCRIPTION ********************/
  PATH.LocalSubs = function () {
    $("#subscribe, #subscribehero").submit(function (e) {
      e.preventDefault();
      var email = $("#subscriber-email, #subscriber-email-hero").val();
      var dataString = "email=" + email;

      function isValidEmail(emailAddress) {
        var pattern = new RegExp(
          /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
        );
        return pattern.test(emailAddress);
      }

      if (isValidEmail(email)) {
        $.ajax({
          type: "POST",
          url: "assets/subscribe/subscribe.php",
          data: dataString,
          success: function () {
            $(".success-msg").fadeIn(1000);
            $(".error-msg").fadeOut(500);
            $(".hide-after").fadeOut(500);
          },
        });
      } else {
        $(".error-msg").fadeIn(1000);
      }

      return false;
    });
  };

  /******************** 10.SMOOTH SCROLL ON BUTTON CLICK  ********************/
  $(document).on("click", "a.smooth", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      1000
    );
  });

  /******************** DOCUMENT READY FUNCTION ********************/
  $(function () {
    PATH.HeaderSticky();
    PATH.HeaderOnePageNav();
    // PATH.MenuClose();
    PATH.TestimonialSlide();
    PATH.ServiceSlide();
    PATH.AjaxChimp();
    PATH.LocalSubs();
  });

  /******************** WINDOW ON SCROLL FUNCTION ********************/
  $(window).on("scroll", function () {
    PATH.HeaderFixed();
  });

  /******************** WINDOW ON LOAD FUNCTION ********************/
  $(window).on("load", function () {});
})(jQuery);

/******************** DARK VERSION ********************/
function setTheme(themeName) {
  localStorage.setItem("stateman_theme", themeName);
  document.documentElement.className = themeName;
}
function toggleTheme() {
  if (localStorage.getItem("stateman_theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}
(function () {
  if (localStorage.getItem("stateman_theme") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("slider").checked = true;
  }
})();

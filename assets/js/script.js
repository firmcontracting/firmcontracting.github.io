$(document).ready(function () {
  // GLightbox initialization
  GLightbox();

  var applyFixedNav = function () {
    if ($(document).scrollTop() > 100) {
      $(".navbar").addClass("nav-color-change");
    } else {
      $(".navbar").removeClass("nav-color-change");
    }
  }

  // If the page is refreshed and we are not at the top of the page there won't be a scroll event, so need to call the
  // function explicitly
  applyFixedNav();

  // Change navigation fixed property on scroll
  $(window).scroll(applyFixedNav);

  // Smooth scrolling
  var scrollLink = $(".scroll");
  scrollLink.click(function (e) {
    let elem = $(this.hash);
    if (elem.length) {
      e.preventDefault();
      $("body,html").animate(
        {
          scrollTop: elem.offset().top,
        },
        1000
      );
    }
  });

  // When the user clicks a navbar link, hide the navbar
  $(".navbar-nav>li>a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
    $(".navbar").removeClass("nav-show");
  });

  $(".navbar-toggler").on("click", function () {
    if ($(".navbar-collapse").hasClass("show")) {
      $(".navbar").removeClass("nav-show");
    } else {
      $(".navbar").addClass("nav-show");
    }
  });

  // Services slider
  $(".services-slider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  // Reviews slider
  $(".reviews-slider").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  // Formspree integration
  var form = document.getElementById("contact-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var button = document.getElementById("contact-form-button");
    var status = document.getElementById("contact-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        button.style = "display: none ";
        status.innerHTML = "Thanks for your submission! We'll get back to you soon.";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form. Please use the contact details above to get in touch."
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form. Please use the contact details above to get in touch."
    });
  })
});

$(document).ready(function () {
  $(".carusel__inner").slick({
    speed: 1200,
    // adaptiveHeight: false,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/chevronleftsolid.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img  src="icons/chevronrightsolid.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__item--active)",
    function () {
      $(this)
        .addClass("catalog__item--active")
        .siblings()
        .removeClass("catalog__item--active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content--active")
        .eq($(this).index())
        .addClass("catalog__content--active");
    }
  );
  $(".catalog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content--active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list--active");
    });
  });
  $(".catalog-item__back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content--active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list--active");
    });
  });

  // Модальное окно

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn();
  });
  $(".modal__close").on("click", function () {
    $(".overlay , #consultation, #thanks, #order").fadeOut("slow");
  });

  $(".button--mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn();
    });
  });

  // Валидация форм
  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Введите имя",
          minlength: jQuery.validator.format("Введите {0} символов"),
        },
        phone: "Введите +7 формате",
        email: {
          required: "Введите почту",
          email: "Указжите корректную почту",
        },
      },
    });
  }

  valideForms("#consultation-form");
  valideForms("#consultation form");
  valideForms("#order form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");
});

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
});

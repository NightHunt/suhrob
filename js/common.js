$(document).ready(function () {

    //nicescroll свойства
    $("body, .left-side").niceScroll({
        horizrailenable: false
    });

    //Для реализации кнопки меню
    $(".btn-mnu").click(function () {
        $(this).toggleClass("active");
        $(".left-side").toggleClass("active");
    });

    //Включение эффекта медленной загрузки картинок
    $(".gallery img").lazyload({
        effect: "fadeIn"
    }).hover(function () { //Функция для эффекта при наведении на картинку
        $(".gallery img").css("opacity", ".7");
        $(this).css("opacity", "1");
    }, function () { //Обратная функция, когда наведения нет
        $(".gallery img").css("opacity", "1");
    });

    $("nav li").hover(function () { //Функция при наведении на меню.
        $(".left-side.active .aside-content nav li:nth-child(1)").prop("title", "");
        $(".left-side.active .aside-content nav li:nth-child(2)").prop("title", "");
        $(".left-side.active .aside-content nav li:nth-child(3)").prop("title", "");
    }, function () { //Обратная функция, когда наведения нет
        $(".left-side .aside-content nav li:nth-child(1)").prop("title", "Обо мне");
        $(".left-side .aside-content nav li:nth-child(2)").prop("title", "Портфолио");
        $(".left-side .aside-content nav li:nth-child(3)").prop("title", "Контанты");
    });

    //Для реализации адаптивной сетки галлереи
    var wall = new freewall(".gallery");
    wall.reset({
        selector: "a",
        animate: true,
        cellW: 150,
        cellH: "auto",
        //Отступы между картинками
        gutterX: 0,
        gutterY: 0,
        onResize: function () {
            wall.fitWidth();
        }
    });

    var images = wall.container.find("a");
    images.find("img").load(function () {
        wall.fitWidth();
    });

    //Используется для реализации карусели для галереи
    $(".filter-label").click(function () {
        $(".filter-label").removeClass("active");
        var filter = $(this).addClass("active").data("filter");
        wall.filter(filter);
        setTimeout(function () {
            $(window).resize();
            wall.fitWidth();
        }, 400);
    });

    $(".gallery a").magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    //Цели для Яндекс.Метрики и Google Analytics
    $(".count_element").on("click", (function () {
        ga("send", "event", "goal", "goal");
        yaCounterXXXXXXXX.reachGoal("goal");
        return true;
    }));

    //SVG Fallback
    if (!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function () {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };

    //Аякс отправка форм
    //Документация: http://api.jquery.com/jquery.ajax/
    $("#callback").submit(function () {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function () {
            alert("Спасибо за заявку!");
            setTimeout(function () {

            }, 1000);
        });
        return false;
    });



});

//Для появления загрузки пока страница не открыта
$(window).load(function () {

    $(".loader-inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");

});

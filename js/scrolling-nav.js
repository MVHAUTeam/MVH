//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 500, 'easeInOutExpo');
        event.preventDefault();
    });
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.results').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 500, 'easeInOutExpo');
        var house = {
        live: $('[name="live"]:checked').val(),
        block: $('[name="block"]:checked').val(),
        bedrooms: $('#selector-bedrooms').val(),
        carpark: $('#selector-carpark').val(),
        size: $('#selector-size').val(),
        age: $('#selector-age').val()
        };
        var postcode = parseInt($('.placepicker').val().match(/\d\d\d\d/));
        postcode = isNaN(postcode) ? 4000 : postcode;
        var buyer = {
            adults: $('[name="adults"]:checked').val(),
            debts: $('[name=debt]')
                .map(function(i,el){return el.value})
                .filter(function(i,el){n = parseFloat(el);return (!isNaN(n)) && n > 0;})
                .map(function(i, el){return parseFloat(el)})
                .toArray(),
            savings: parseFloat($('#inputSavings').val()),
            savingsInterval: $('#selectSavings').val(),
            living: $('[name="living"]:checked').val(),
            rent: parseFloat($('#inputRent').val()),
            rentInterval: $('#selectRent').val(),
        };
        var finance = {
            deposit: parseInt($('#inputDeposit').val()),
            help: $('[name="help"]:checked').val(),
            //Quick and dirty child age validation.
            children: $('.child-age')
                .map(function(i,el){return el.value})
                .filter(function(i,el){n = parseInt(el);return (!isNaN(n)) && n > 0 && n < 21;})
                .map(function(i, el){return parseInt(el)})
                .toArray()
        }



        console.log(house);
        console.log(postcode);
        console.log(finance);
        console.log(buyer);
    });
    event.preventDefault();
});

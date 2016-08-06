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
        buyer.savings = isNaN(buyer.savings) ? 200 : buyer.savings;
        buyer.rent = isNaN(buyer.rent) ? 800 : buyer.rent;
        var finance = {
            initialDeposit: parseInt($('#inputDeposit').val()),
            help: $('[name="help"]:checked').val(),
            //Quick and dirty child age validation.
            children: $('.child-age')
                .map(function(i,el){return el.value})
                .filter(function(i,el){n = parseInt(el);return (!isNaN(n)) && n > 0 && n < 21;})
                .map(function(i, el){return parseInt(el)})
                .toArray()
        }
        finance.initialDeposit = isNaN(finance.initialDeposit) ? 0 : finance.initialDeposit;
        console.log(finance.initialDeposit);
        var depositPoints = [];

        var testPropertyVal = 600000;
        var totalExpense = testPropertyVal * 1.03;
        var depositGoal = totalExpense * 0.2;
        var predictedDeposit = finance.initialDeposit;
        var monthlyInterestRate = .03 / 12;
        var monthlySavings = buyer.savings / buyer.savingsInterval * 30;
        while(predictedDeposit < depositGoal) {
            if(depositPoints.length > 10000) {
                console.log("Loop ending early for deposit");
                console.log(predictedDeposit);
                console.log(monthlySavings);
                break;
            }
            depositPoints.push([(depositPoints.length - 8) / 12,predictedDeposit]);
            predictedDeposit = predictedDeposit * (1 + monthlyInterestRate) + monthlySavings;
        }
        console.log(depositPoints);
        var options = {
            xaxis: {min: 0, max: (depositPoints.length - 8) / 12,
                ticks: function(v) {return Math.floor((v - 8) / 12)}
            },
            yaxis: {min: 0, max: depositGoal, show: false}
        };

        var mortgage = totalExpense - depositGoal;
        var mortgagePoints = [];
        var mortgagePoints2 = [];
        var monthlyMortgageInterest = 0.04 / 12;
        var monthlyMaxRepayment = monthlySavings + buyer.rent / buyer.rentInterval * 30;
        var monthlyMinRepayment = monthlyMortgageInterest * mortgage / (1 - Math.pow((1 + monthlyMortgageInterest), -25 * 12));
        while(mortgage >= 0) {
            if(mortgagePoints.length > (12 * 25)) {
                console.log("Mortgage");
                console.log(predictedDeposit);
                console.log(monthlyMaxRepayment);
                console.log(mortgage * (monthlyMortgageInterest));
                break;
            }
            mortgagePoints.push([(mortgagePoints.length - 8) / 12, mortgage]);
            mortgage = mortgage * (1 + monthlyMortgageInterest) - monthlyMaxRepayment; 
        }
        mortgage = totalExpense - depositGoal;
        while(mortgage >= 0) {
            if(mortgagePoints2.length > (12 * 25)) {
                console.log("Mortgage");
                console.log(predictedDeposit);
                console.log(mortgage * (monthlyMortgageInterest));
                break;
            }
            mortgagePoints2.push([(mortgagePoints2.length - 8) / 12, mortgage]);
            mortgage = mortgage * (1 + monthlyMortgageInterest) - monthlyMinRepayment; 
        }
        console.log(monthlyMinRepayment);
        console.log(monthlyMortgageInterest);
        console.log(mortgagePoints2);
        $.plot("#placeholder", [depositPoints], options);
        options.xaxis.max = (Math.max(mortgagePoints.length, mortgagePoints2.length) - 8) / 12;
        options.yaxis.max = totalExpense - depositGoal;
        $.plot("#placeholder-mortgage", [mortgagePoints, mortgagePoints2], options);
        console.log(house);
        console.log(postcode);
        console.log(finance);
        console.log(buyer);
    });
    event.preventDefault();
});

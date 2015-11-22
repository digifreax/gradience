(function($) {

    $( "#anim-toggle1" ).click(function() {
        $("#anim-body").slideToggle( "slow" );

        $('#anim-toggle1').toggleClass(function() {
            if ($(this).is('.fa fa-chevron-down')) {
                return '.fa fa-chevron-up';
            } else {
                return '.fa fa-chevron-down';
            }
        })
    });
    $('#loading-button').each(function(i, e) {
        var $button = $(e),
            loading = $button.data('loading-text'),
            text = $button.text();
        $button.click(function() {
            $button.prop("disabled", true);
            $button.text(loading);
            setTimeout(function() {
                $button.prop("disabled", false);
                $button.text(text);
            }, 10 * 1000);
        });
    });
    $( "#anim-toggle2" ).click(function() {
        $("#anim-body1").slideToggle( "slow" );

        $('#anim-toggle2').toggleClass(function() {
            if ($(this).is('.fa fa-chevron-down')) {
                return '.fa fa-chevron-up';
            } else {
                return '.fa fa-chevron-down';
            }
        })
    });

    $('a[href="#"]').click(function(e) {
        e.preventDefault();
    });

    $('[data-role="source-anim"]').each(function(i, button) {
        var $button = $(button);
        var $icon = $button.find(".source-icon"),
            $text = $button.find(".source-text");
        $text.stop().hide();
        $button.hover(function() {
            $button.removeClass("btn-primary")
                .addClass("btn-success");
            $text.stop().fadeIn(150);
        }, function() {
            $button.removeClass("btn-success")
                .addClass("btn-primary");
            $text.stop().fadeOut(150);
        })
    });

    $('.dropdown').each(function() {
        $(this).on('show.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(null, false).fadeIn(500);
        }).on('hide.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(null, false).fadeOut(500);
        });
    });
    $('[data-toggle="popover"]').popover({
        container: 'body'
    });
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });

    var states = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","America (USA)",
        "Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria",
        "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
        "Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana",
        "Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi",
        "Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia",
        "Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus",
        "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
        "Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France",
        "French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece",
        "Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras",
        "Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy",
        "Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon",
        "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi",
        "Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro",
        "Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia",
        "New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea",
        "Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda",
        "Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles",
        "Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis",
        "St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
        "Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan",
        "Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela",
        "Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

    var matcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push({
                        value: str
                    });
                }
            });

            cb(matches);
        };
    };

    $("#typeahead-example").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'states',
        displayKey: 'value',
        source: matcher(states)
    }).focus();

    var $body = $("body");
    var navHeight = $('.navbar').outerHeight(true) + 10;

    var $sidebar = $('#sidebar');

    var $list = $sidebar.find('ul.nav-stacked');
    $list.css('min-width', $list.width());

    $sidebar.affix({
        offset: {
            top: navHeight
        }
    });

    $body.scrollspy({
        target: '#leftCol',
        offset: navHeight
    });

    $('a[href*=#]:not([href=#]):not([data-toggle="tab"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 50
                }, 1000);
                return false;
            }
        }
    });

})(jQuery);


$(document).ready(function() {
    var canadaParts = ['#canada', '#newfoundland', '#victoria', '#devon', '#southhampton',
        '#ellesmere', '#bylot', '#baffin', '#bathurst', '#cornwallis', '#prescott',
        '#princeofwales', '#banks', '#princepatrick', '#eglinton', '#mackenzieking',
        '#ellefringnes', '#amundringnes', '#axelheiberg', '#kingchristian'
    ];
    var canada = canadaParts.join(',');
    var places = [canada, '#usa', '#cuba', '#dominicanrepublic', '#italy'];


    function colourTravelled() {
        for (var i = 0; i < places.length; ++i) {
            $(places[i]).css('fill', 'darkcyan');
        }
    }

    function fadeOnHover() {
        $.each(places, function (idx, place) {
            $(place).hover(function() {
                    $(place).stop().animate({
                        'opacity': 0.5
                    }, 'slow');
                },

                function() {
                    $(place).stop().animate({
                        'opacity': 1
                    }, 'slow');
                });
        });
    }

    function textOnHover(){
        $.each(places, function(idx, place){
            $(place).hover(function(){
                console.log(place);
    });
    });
    }

    function execute() {
        fadeOnHover();
        colourTravelled();
    }

    execute();
});

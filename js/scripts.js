$(document).ready(function() {

    /***************** Article Class Finder ******************/

    $('.latest-articles').find('img').each(function() {
        var imgClass = (this.width / this.height > 1) ? 'wide' : 'tall';
        $(this).addClass(imgClass);
    });

    /***************** Share Dropdown ******************/

    $("li a.share-trigger").on("click", function() {
        $('.share-dropdown').toggleClass("is-open");
        event.preventDefault();
    });

    /***************** Search Component ******************/

    $(".show-search").on("click", function() {
      //  $(".search-wrapper").addClass("is-visible");
    });

    $(".hide-search").on("click", function() {
        $(".search-wrapper").removeClass("is-visible");
        $(".search-wrapper input").removeClass("is-selected");
    });

    $(".search-wrapper input").on("click", function() {
        $(this).addClass("is-selected");
    });

    $('.search-wrapper input').keypress(function(e) {
        if (e.which === 13) { //Enter key pressed
            window.alert("Ready for implementation.");
        }
    });

    /***************** Bar Chart Animation ******************/

    $('.bar').width('0%');
    $('.bar').waypoint(function() {
        $('.bar').each(function() {
            var width = $(this).data("percentage");
            $(this).animate({
                width: width
            }, {
                duration: 2000,
                easing: 'easeOutExpo',
            });
        });
    }, {
        offset: '85%'
    });

    /***************** Stats Counter ******************/

    var counterZero = '0';
    $('.stats-number').text(counterZero);

    $('.stats-number').waypoint(function() {
        $('.stats-number').each(function() {
            var $this = $(this);
            $({
                Counter: 0
            }).animate({
                Counter: $this.attr('data-stop')
            }, {
                duration: 5000,
                easing: 'swing',
                step: function(now) {
                    $this.text(Math.ceil(now));
                }
            });
        });
        this.destroy();
    }, {
        offset: '75%'
    });

    /***************** Smooth Scroll ******************/

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 2000);
                return false;
            }
        }
    });

    /***************** Responsive Nav ******************/

    $('.nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('.navicon').toggleClass('fixed');
        $('.primary-nav-wrapper').toggleClass('open');
        event.preventDefault();
    });
    $('.primary-nav-wrapper li a').click(function() {
        $('.nav-toggle').toggleClass('active');
        $('.navicon').toggleClass('fixed');
        $('.primary-nav-wrapper').toggleClass('open');
    });

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function() {
        $('.wp1').addClass('animated fadeInUp');
    }, {
        offset: '80%'
    });
    $('.wp2').waypoint(function() {
        $('.wp2').addClass('animated fadeInUp');
    }, {
        offset: '95%'
    });
    $('.wp3').waypoint(function() {
        $('.wp3').addClass('animated fadeInUp');
    }, {
        offset: '95%'
    });
    $('.wp4').waypoint(function() {
        $('.wp4').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function() {
        $('.wp5').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function() {
        $('.wp6').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function() {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function() {
        $('.wp8').addClass('animated zoomIn');
    }, {
        offset: '75%'
    });

    $('.wp9').waypoint(function() {
        $('.wp9').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });

    $('.wp10').waypoint(function() {
        $('.wp10').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });

    $('.wp11').waypoint(function() {
        $('.wp11').addClass('animated zoomIn');
    }, {
        offset: '95%'
    });

    $('.wp12').waypoint(function() {
        $('.wp12').addClass('animated fadeIn');
    }, {
        offset: '95%'
    });

    $('.wp13').waypoint(function() {
        $('.wp13').addClass('animated fadeInUp');
    }, {
        offset: '95%'
    });

    $('.wp14').waypoint(function() {
        $('.wp14').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });

    /***************** Overlay touch/hover events ******************/

    if (Modernizr.touch) {
        $('figure').bind('touchstart touchend', function(e) {
            $(this).toggleClass('hover');
        });
    }


    /***************** ENVIO FORM CONTACT ******************/
    $('#enviar_btn').show();
    $('#enviando').hide();
    $('#enviado_ok').hide();
    $('#alert_error').hide();
    

    $('#form-enviar').submit(function(event) {
        event.preventDefault();

        $('#enviar_btn').hide('slow');
        $('#enviando').show('slow');
        $('#enviado_ok').hide('slow');

        var formData = $(this).serializeArray();
        console.log("formData: ", formData);
        $.ajax({
            url:'back/valida.php',
            method:'POST',
            data: formData,
            success:function(data){
                if(data=='ok'){
                    $('#enviar_btn').show('slow');
                    $('#enviado_ok').show('slow');
                    $('#enviando').hide('slow');
                    $('#alert_error').hide();
                    $('#msg_error').empty();
                }else{
                    $('#alert_error').show('slow');
                    $('#msg_error').html(data);
                    $('#enviar_btn').show('slow');
                    $('#enviando').hide('slow');                    
                }
            }
        }); 

    });


});
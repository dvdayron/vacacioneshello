// guests
var guestSelector = '#guests';
var roomsSelector = '#rooms-list';
var adultsSelector = '#adults-count';
var childrensSelector = '#childrens-count';
var adults = 2;
var childrens = 0;

function setGuestsValue() {
    $(guestSelector).val(
        adults + ' Adultos + ' + childrens +' Niños'
    );
    $(adultsSelector).text(adults);
    $(childrensSelector).text(childrens);
}

function setAdults(value) {
    adults = adults + value >= 1 ? adults + value : 1;
    setGuestsValue();
}

function setChildrens(value) {
    childrens = childrens + value >= 0 ? childrens + value : 0;
    setGuestsValue();
}

$(document).ready(function(){
    // master slider
    if ($('.master-slider').length > 0) {
        var slider = new MasterSlider();
        slider.setup('masterslider' , {
            layout: "fullscreen",
            fullwidth:true,
            autoHeight:true,
            start: 1,
            autoplay: true,
            loop: true,
            overPause: true,
            speed: 7,
            swipe: false
        });
        MSScrollParallax.setup(slider,50,80,true);
    }

    // datepickers
    if ($('.calendar').length) {
        $('.calendar').datetimepicker({
            format: 'DD/MM/YYYY'
        });
    }

    if ($(guestSelector).length) {
        // open rooms list
        $(guestSelector).click(function (e) {
            e.stopPropagation();
            $(roomsSelector).addClass('active');
        });
        // close rooms list
        $('body').click(function (e) {
            $(roomsSelector).removeClass('active');
        })
        $(roomsSelector).click(function (e) {
            e.stopPropagation();
        })

        // set guest value
        setGuestsValue();
    }

    // reservation form actions
    var formSelector = '.reservation-form';
    var reservationSelector = '.reservation-options';
    var flySelector = '.fly-options';
    var tagsList = 'hotel fly-and-hotel';
    if ($(reservationSelector).length) {
        $(reservationSelector + ' a').click(function () {
            var currentTag = $(this).data('tag');
            $(reservationSelector + ' a').removeClass('active');
            $(this).addClass('active');
            $(formSelector).removeClass(tagsList);
            $(formSelector).addClass(currentTag);
        });
        $(flySelector + ' a').click(function () {
            $(flySelector + ' a').removeClass('active');
            $(this).addClass('active');
        });
    }

    // modal form
    var sending = false;
    var fields = ['name', 'last-name', 'email', 'phone'];

    function formIsValid() {
        $('.form-group').removeClass('error');
        var hasError = false;
        for (var i = 0; i < fields.length; i++) {
            if (!$('#' + fields[i]).val()) {
                $('#' + fields[i]).parent('.form-group').addClass('error');
                hasError = true;
            }
        }
        return !hasError;
    }

    function clearForm() {
        for (var i = 0; i < fields.length; i++) {
            $('#' + fields[i]).val('');
        }
        sending = false;
        $('.modal-footer').removeClass('loading');
    }

    function showSuccessMessage() {
        $('.modal-footer .alert').removeClass('hidden');
        setTimeout(function () {
            $('#contact-modal').modal('hide');
        }, 1400);
    }

    if ($('#modal-form').length) {
        $('#modal-form').submit(function (e) {
            e.preventDefault();

            if (sending) {
                return false;
            }

            sending = true;
            $('.modal-footer').addClass('loading');

            if (!formIsValid()) {
                return false;
            }

            // form fields
            var name = $('#name').val();
            var lastName = $('#last-name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            // reservation fields
            var reservationMode = $(reservationSelector  + ' a.active').text();
            var flyType = $(flySelector + ' a.active').text();
            var origin = $('#origin').val();
            var destiny = $('#destiny').val();
            var startDate = $('#start-date').val();
            var endDate = $('#end-date').val();
            var guests = $('#guests').val();

            // process form
            jQuery.ajax({
                url : 'app/contact-form.php',
                type: 'POST',
                data: {
                    name,
                    lastName,
                    email,
                    phone,
                    reservationMode,
                    flyType,
                    origin,
                    destiny,
                    startDate,
                    endDate,
                    guests,
                },
                success: function(result){
                    clearForm();
                    showSuccessMessage();
                }
            });

            return false;
        });
    }
});

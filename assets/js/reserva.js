$(document).ready(function() {
    // Verificar si el usuario está autenticado
    var user = localStorage.getItem('user');
    if (!user) {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'login.html';
    } else {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var authenticatedUser = users.find(function(u) {
            return u.name === user;
        });

        if (authenticatedUser) {
            $('#client-name').val(authenticatedUser.name);
            $('#client-email').val(authenticatedUser.email);
        }
    }

    // Obtener la lista de barberos del local storage
    var barbers = JSON.parse(localStorage.getItem('barbers')) || [];
    var reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    var selectedBarberIndex = null;

    // Limitar la selección de fechas a 3 semanas desde la fecha actual
    var today = new Date().toISOString().split('T')[0];
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 21);
    maxDate = maxDate.toISOString().split('T')[0];
    $('#reservation-date').attr('min', today);
    $('#reservation-date').attr('max', maxDate);

    // Función para mostrar los barberos en la lista
    function renderBarbers() {
        $('#barber-list').empty();
        barbers.forEach(function(barber, index) {
            var card = $('<div>').addClass('col-md-4 barber-card').appendTo('#barber-list');
            var cardInner = $('<div>').addClass('card text-center h-100').appendTo(card);
            var cardBody = $('<div>').addClass('card-body').appendTo(cardInner);
            $('<h5>').addClass('card-title').text(barber.name).appendTo(cardBody);
            $('<img>').attr('src', barber.photo).css('max-width', '100px').appendTo(cardBody);
            $('<p>').addClass('card-text').text('Servicios: ' + barber.services.join(', ')).appendTo(cardBody);

            // Botón de selección
            var selectButton = $('<button>').text('Seleccionar').addClass('btn btn-primary mt-2 select-barber').appendTo(cardBody);
            selectButton.click(function() {
                // Guardar el índice del barbero seleccionado
                selectedBarberIndex = index;
                // Mostrar los servicios del barbero seleccionado
                renderServices(barber.services, barber.name);
                // Limpiar fecha y hora seleccionadas
                $('#reservation-date').val('');
                $('#reservation-time').val('');
                $('#reservation-time option').prop('disabled', false);
                // Resaltar el barbero seleccionado
                $('.select-barber').removeClass('btn-danger').addClass('btn-primary');
                $(this).removeClass('btn-primary').addClass('btn-danger');
            });
        });
    }

    // Función para mostrar los servicios del barbero seleccionado
    function renderServices(services, barberName) {
        $('#barber-name').text(barberName);
        $('#services-list').empty();
        services.forEach(function(service) {
            var serviceItem = $('<div>').addClass('col-6').appendTo('#services-list');
            var formCheck = $('<div>').addClass('form-check').appendTo(serviceItem);
            $('<input>').addClass('form-check-input').attr('type', 'checkbox').attr('id', 'service-' + service).attr('name', 'services[]').attr('value', service).appendTo(formCheck);
            $('<label>').addClass('form-check-label').attr('for', 'service-' + service).text(service).appendTo(formCheck);
        });
    }

    // Función para actualizar la lista de horas disponibles según la fecha seleccionada
    function updateAvailableTimes(date) {
        if (selectedBarberIndex === null) return;

        var reservedTimes = reservations.filter(function(reservation) {
            return reservation.barber === barbers[selectedBarberIndex].name && reservation.date === date;
        }).map(function(reservation) {
            return reservation.time;
        });

        $('#reservation-time option').each(function() {
            $(this).prop('disabled', reservedTimes.includes($(this).val()));
        });
    }

    // Mostrar los barberos existentes al cargar la página
    renderBarbers();

    // Actualizar horas disponibles cuando se selecciona una fecha
    $('#reservation-date').change(function() {
        var date = $(this).val();
        updateAvailableTimes(date);
    });

    // Función para manejar el envío del formulario de reserva
    $('#reservation-form').submit(function(event) {
        event.preventDefault();

        if (selectedBarberIndex === null) {
            alert('Por favor, seleccione un barbero.');
            return;
        }

        // Obtener los datos del formulario
        var date = $('#reservation-date').val();
        var time = $('#reservation-time').val();
        var services = $('input[name="services[]"]:checked').map(function() {
            return $(this).val();
        }).get();

        if (services.length === 0) {
            alert('Por favor, seleccione al menos un servicio.');
            return;
        }

        // Obtener los datos del usuario autenticado
        var user = localStorage.getItem('user');
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var authenticatedUser = users.find(function(u) {
            return u.name === user;
        });

        if (!authenticatedUser) {
            alert('Error: Usuario no autenticado.');
            return;
        }

        // Crear el objeto de reserva
        var reservation = {
            barber: barbers[selectedBarberIndex].name,
            photo: barbers[selectedBarberIndex].photo,
            date: date,
            time: time,
            services: services,
            clientName: authenticatedUser.name,
            clientEmail: authenticatedUser.email
        };

        // Obtener la lista de reservas del local storage
        reservations = JSON.parse(localStorage.getItem('reservations')) || [];

        // Agregar la nueva reserva a la lista
        reservations.push(reservation);

        // Guardar la lista actualizada en el local storage
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Limpiar el formulario
        this.reset();
        $('#services-list').empty();
        $('#reservation-date').val('');
        $('#reservation-time').val('');

        // Notificar al usuario y redirigir al homepage
        alert('La reserva se ha guardado exitosamente.');
        window.location.href = 'homepage.html';
    });

    // Manejador de evento para el botón de volver
    $('#backButton').click(function() {
        window.location.href = 'homepage.html';
    });
});

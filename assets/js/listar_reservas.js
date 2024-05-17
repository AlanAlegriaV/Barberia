$(document).ready(function() {
    // Función para cargar y mostrar las reservas en la tabla
    function loadReservations() {
        var reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        var $tableBody = $('#reservations-table-body');
        $tableBody.empty();

        reservations.forEach(function(reservation, index) {
            var $row = $('<tr>');
            $('<td>').text(reservation.clientName).appendTo($row);
            $('<td>').text(reservation.clientEmail).appendTo($row);
            $('<td>').text(reservation.barber).appendTo($row);
            $('<td>').text(reservation.services.join(', ')).appendTo($row);
            $('<td>').text(reservation.date).appendTo($row);
            $('<td>').text(reservation.time).appendTo($row);

            // Botón de eliminar
            var $deleteButton = $('<button>').text('Eliminar').addClass('btn btn-danger btn-sm');
            $deleteButton.click(function() {
                if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
                    deleteReservation(index);
                }
            });

            $('<td>').append($deleteButton).appendTo($row);
            $row.appendTo($tableBody);
        });
    }

    // Función para eliminar una reserva
    function deleteReservation(index) {
        var reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        loadReservations();
    }

    // Cargar las reservas al cargar la página
    loadReservations();

    // Manejador de evento para el botón de volver
    $('#backButton').click(function() {
        window.location.href = 'registro.html';
    });
});

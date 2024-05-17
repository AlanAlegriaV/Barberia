$(document).ready(function() {
    // Obtener la lista de barberos del local storage
    var barbers = JSON.parse(localStorage.getItem('barbers')) || [];
    var selectedBarberIndex = null;

    // Función para mostrar la miniatura de la imagen seleccionada
    $('#barber-photo').change(function() {
        var file = this.files[0];
        if (file && file.type.match('image.*')) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#preview-image').attr('src', e.target.result).show();
            };
            reader.readAsDataURL(file);
        } else {
            $('#preview-image').hide();
        }
    });

    // Función para mostrar los barberos en la lista
    function renderBarbers() {
        $('#barber-list').empty();
        barbers.forEach(function(barber, index) {
            var card = $('<div>').addClass('col-md-4 mb-3').appendTo('#barber-list');
            var cardInner = $('<div>').addClass('card text-center h-100').appendTo(card);
            var cardBody = $('<div>').addClass('card-body').appendTo(cardInner);
            $('<h5>').addClass('card-title').text(barber.name).appendTo(cardBody);
            $('<img>').attr('src', barber.photo).css('max-width', '100px').appendTo(cardBody);
            $('<p>').addClass('card-text').text('Teléfono: ' + barber.phone).appendTo(cardBody);
            $('<p>').addClass('card-text').text('Correo: ' + barber.email).appendTo(cardBody);
            $('<p>').addClass('card-text').text('Servicios: ' + barber.services.join(', ')).appendTo(cardBody);

            // Botón de selección
            $('<button>').text('Seleccionar').addClass('btn btn-primary mt-2').appendTo(cardBody).click(function() {
                // Rellenar el formulario con los datos del barbero seleccionado
                $('#barber-name').val(barber.name);
                $('#preview-image').attr('src', barber.photo).show();
                $('#barber-phone').val(barber.phone);
                $('#barber-email').val(barber.email);

                // Marcar los servicios del barbero como seleccionados
                $('input[name="services[]"]').prop('checked', false);
                barber.services.forEach(function(service) {
                    $('input[name="services[]"][value="' + service + '"]').prop('checked', true);
                });

                // Guardar el índice del barbero seleccionado
                selectedBarberIndex = index;

                // Cambiar el botón de registro por el de modificación
                $('button[type="submit"]').hide();
                $('#modify-barber-btn').show();
            });

            // Botón de eliminación
            $('<button>').text('Eliminar').addClass('btn btn-danger mt-2 ml-2').appendTo(cardBody).click(function() {
                if (confirm('¿Está seguro de eliminar a ' + barber.name + '?')) {
                    barbers.splice(index, 1);
                    localStorage.setItem('barbers', JSON.stringify(barbers));
                    renderBarbers();
                }
            });
        });
    }

    // Mostrar los barberos existentes al cargar la página
    renderBarbers();

    // Función para manejar el envío del formulario
    $('#barber-form').submit(function(event) {
        event.preventDefault();

        // Obtener los datos del formulario
        var name = $('#barber-name').val();
        var photo = $('#preview-image').attr('src');
        var phone = $('#barber-phone').val();
        var email = $('#barber-email').val();
        var services = $('input[name="services[]"]:checked').map(function() {
            return $(this).val();
        }).get();

        // Crear el objeto de barbero
        var barber = {
            name: name,
            photo: photo,
            phone: phone,
            email: email,
            services: services
        };

        if (selectedBarberIndex !== null) {
            // Modificar el barbero existente
            barbers[selectedBarberIndex] = barber;
            selectedBarberIndex = null;

            // Cambiar el botón de modificación por el de registro
            $('#modify-barber-btn').hide();
            $('button[type="submit"]').show();
        } else {
            // Agregar el nuevo barbero a la lista
            barbers.push(barber);
        }

        // Guardar la lista actualizada en el local storage
        localStorage.setItem('barbers', JSON.stringify(barbers));

        // Limpiar el formulario
        this.reset();
        $('#preview-image').hide();

        // Mostrar los barberos actualizados
        renderBarbers();

        // Notificar al usuario
        alert('El barbero se ha registrado exitosamente.');
    });

    // Función para manejar la modificación del barbero
    $('#modify-barber-btn').click(function() {
        // Forzar el envío del formulario para validar y guardar los cambios
        $('#barber-form').submit();
    });
});

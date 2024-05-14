$(document).ready(function(){
    // Esta línea asegura que el código se ejecute una vez que el documento HTML haya sido completamente cargado.
    
    // Aquí comenzamos la configuración de la validación del formulario usando el plugin jQuery Validate.
    $('#registerForm').validate({
        // Establecemos las reglas de validación para cada campo del formulario.
        rules: {
            // Regla para el campo de nombre: requerido (required).
            name: {
                required: true
            },
            // Regla para el campo de correo electrónico: requerido y debe ser un correo electrónico válido.
            email: {
                required: true,
                email: true
            },
            // Regla para el campo de contraseña: requerido y debe tener al menos 6 caracteres.
            password: {
                required: true,
                minlength: 6
            },
            // Regla para el campo de confirmación de contraseña: requerido y debe coincidir con el campo de contraseña.
            confirmPassword: {
                required: true,
                equalTo: '#password' // Indicamos que debe ser igual al campo de contraseña.
            }
        },
        // Mensajes de error personalizados para cada regla de validación.
        messages: {
            // Mensaje de error para el campo de nombre si no se cumple la regla de requerido.
            name: {
                required: 'Por favor ingresa tu nombre'
            },
            // Mensaje de error para el campo de correo electrónico si no se cumple la regla de requerido o no es un correo válido.
            email: {
                required: 'Por favor ingresa tu correo electrónico',
                email: 'Por favor ingresa un correo electrónico válido'
            },
            // Mensaje de error para el campo de contraseña si no se cumple la regla de requerido o no tiene al menos 6 caracteres.
            password: {
                required: 'Por favor ingresa una contraseña',
                minlength: 'La contraseña debe tener al menos 6 caracteres'
            },
            // Mensaje de error para el campo de confirmación de contraseña si no se cumple la regla de requerido o no coincide con el campo de contraseña.
            confirmPassword: {
                required: 'Por favor confirma tu contraseña',
                equalTo: 'Las contraseñas no coinciden'
            }
        },
        // Función que se ejecuta cuando el formulario se envía con éxito.
        submitHandler: function(form) {
            // Obtenemos los valores del formulario.
            var name = $('#name').val();
            var email = $('#email').val();
            var password = $('#password').val();

            // Creamos un objeto de usuario con los datos del formulario.
            var newUser = {
                name: name,
                email: email,
                password: password
            };

            // Obtenemos la lista de usuarios almacenada en localStorage o creamos una lista vacía si no existe.
            var users = JSON.parse(localStorage.getItem('users')) || [];

            // Agregamos el nuevo usuario a la lista de usuarios.
            users.push(newUser);

            // Almacenamos la lista de usuarios actualizada en localStorage.
            localStorage.setItem('users', JSON.stringify(users));

            // Redirigimos a la página de usuario creado.
            window.location.href = 'usuariocreado.html';

            // Limpiamos el formulario.
            form.reset();
        }
    });
});
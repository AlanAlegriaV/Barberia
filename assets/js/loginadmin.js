$(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault();

        // Obtener los valores ingresados
        var username = $('#username').val();
        var password = $('#password').val();

        // Verificar los valores
        if (username === 'admin' && password === 'admin') {
            // Redirigir a la página de reservas si las credenciales son correctas
            window.location.href = 'registro.html';
        } else {
            // Mostrar un mensaje de error si las credenciales son incorrectas
            alert('Usuario o contraseña incorrectos.');
        }
    });
});

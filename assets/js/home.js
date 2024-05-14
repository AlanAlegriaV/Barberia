$(document).ready(function() {
    // Función para verificar si hay un usuario autenticado al cargar la página
    checkAuthState();

    // Función que se ejecuta cuando se hace clic en el botón de cerrar sesión
    $('#logoutButton').click(function(e) {
        e.preventDefault(); // Evita que se realice la acción predeterminada del botón (navegar a otra página)

        // Eliminamos el usuario del almacenamiento local
        localStorage.removeItem('user');

        // Volvemos a cargar la página para actualizar la vista
        window.location.reload();
    });

    // Función para verificar el estado de autenticación del usuario
    function checkAuthState() {
        // Obtenemos el nombre del usuario almacenado en el almacenamiento local
        var username = localStorage.getItem('user');

        // Verificamos si hay un usuario autenticado
        if (username) {
            // Si hay un usuario autenticado, mostramos el mensaje de bienvenida y el botón de cerrar sesión
            $('.mensaje-bienvenida').show();
            $('#usernameLabel').text(username);
            $('.cerrar-sesion').show();
        } else {
            // Si no hay un usuario autenticado, ocultamos el mensaje de bienvenida y el botón de cerrar sesión
            $('.mensaje-bienvenida').hide();
            $('.cerrar-sesion').hide();
        }
    }
});
$(document).ready(function(){
    // Función que se ejecuta cuando se hace clic en el botón de inicio de sesión
    $('#loginButton').click(function(e) {
        e.preventDefault(); // Evita que se realice la acción predeterminada del botón (enviar el formulario)

        // Obtenemos el correo electrónico y la contraseña ingresados por el usuario
        var email = $('#email').val();
        var password = $('#password').val();

        // Obtenemos la lista de usuarios almacenada en localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Buscamos un usuario con el correo electrónico y la contraseña proporcionados
        var authenticatedUser = users.find(function(user) {
            return user.email === email && user.password === password;
        });

        // Verificamos si se encontró un usuario autenticado
        if (authenticatedUser) {
            // Si se encontró, almacenamos el nombre del usuario en el almacenamiento local
            localStorage.setItem('user', authenticatedUser.name);
            // Redirigimos al usuario a la página de inicio
            window.location.href = './homepage.html';
        } else {
            // Si no se encontró, mostramos un mensaje de error al usuario
            alert('Correo electrónico o contraseña incorrectos');
        }
    });
});
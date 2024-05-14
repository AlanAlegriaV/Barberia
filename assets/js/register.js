$(document).ready(function(){
    $('#registerForm').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            name: {
                required: 'Por favor ingresa tu nombre'
            },
            email: {
                required: 'Por favor ingresa tu correo electrónico',
                email: 'Por favor ingresa un correo electrónico válido'
            },
            password: {
                required: 'Por favor ingresa una contraseña',
                minlength: 'La contraseña debe tener al menos 6 caracteres'
            },
            confirmPassword: {
                required: 'Por favor confirma tu contraseña',
                equalTo: 'Las contraseñas no coinciden'
            }
        },
        submitHandler: function(form) {
            var name = $('#name').val();
            var email = $('#email').val();
            var password = $('#password').val();

            var newUser = {
                name: name,
                email: email,
                password: password
            };

            var users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            window.location.href = 'usuariocreado.html';
            form.reset();
        }
    });
});
$(document).ready(function() {
    // Función para verificar si hay un usuario autenticado al cargar la página
    checkAuthState();
    
    
    // Función que se ejecuta cuando se hace clic en el botón de cerrar sesión
    $('#logoutButton').click(function(e) {
        e.preventDefault(); // Evita que se realice la acción predeterminada del botón (navegar a otra página)

        // Eliminamos el usuario del almacenamiento local
        localStorage.removeItem('user');

        // Volvemos a cargar la página para actualizar la vista
        window.location.href = 'cerrarsesion.html';
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

    async function obtenerValores() {
        try {
            // Hacemos la petición a la API para obtener el valor del Bitcoin y del Dólar a Peso Chileno
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,clp');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Obtenemos los valores de Bitcoin y Dólar a Peso Chileno
            const precioBitcoinUSD = data.bitcoin.usd; // Precio del Bitcoin en USD
            const precioBitcoinCLP = data.bitcoin.clp; // Precio del Bitcoin en CLP

            // Calculamos el valor del Dólar en Peso Chileno
            const precioDolarCLP = precioBitcoinCLP / precioBitcoinUSD;

            // Actualizamos el contenido de los párrafos con los valores obtenidos
            document.getElementById('valorBitcoin').innerText = `1 BTC = ${precioBitcoinUSD} USD`;
            document.getElementById('valorDolar').innerText = `1 USD = ${precioDolarCLP.toFixed(2)} CLP`;
        } catch (error) {
            console.error('Error al obtener los valores:', error);
            document.getElementById('valorBitcoin').innerText = 'Error al obtener el valor del Bitcoin';
            document.getElementById('valorDolar').innerText = 'Error al obtener el valor del Dólar a Peso Chileno';
        }
    }

    // Llamamos a la función para obtener los valores cuando la página se carga
    obtenerValores();
});
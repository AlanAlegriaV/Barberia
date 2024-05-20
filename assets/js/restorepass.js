(function() {
    'use strict';
    window.addEventListener('load', function() {
        var form = document.getElementById('recover-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            var emailInput = document.getElementById('emailInput');
            
            if (form.checkValidity() === false) {
                emailInput.classList.add('is-invalid');
            } else {
                emailInput.classList.remove('is-invalid');
                window.location.href = 'revisacorreo.html';
            }
            
            form.classList.add('was-validated');
        }, false);
    }, false);
})();
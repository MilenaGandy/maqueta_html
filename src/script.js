
// VALIDACIONES DEL LOGIN *********************************************************
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Credenciales ficticias
    const validEmail = "admin@helpdesk.com";
    const validPassword = "admin123";

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que se envíe el formulario directamente

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validaciones
        if (!validateEmail(email)) {
            showAlert("Por favor, ingresa un correo válido.", "error");
            return;
        }

        if (password.length < 6) {
            showAlert("La contraseña debe tener al menos 6 caracteres.", "error");
            return;
        }

        if (email === validEmail && password === validPassword) {
            showAlert("Inicio de sesión exitoso. Cargando...", "success");
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirige a la página del dashboard
            }, 2000);
        } else {
            showAlert("Correo o contraseña incorrectos.", "error");
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showAlert(message, type) {
        let alertBox = document.querySelector(".alert-message");
        if (!alertBox) {
            alertBox = document.createElement("div");
            alertBox.classList.add("alert-message");
            form.prepend(alertBox);
        }

        alertBox.textContent = message;
        alertBox.style.color = type === "error" ? "red" : "green";

        setTimeout(() => {
            alertBox.remove();
        }, 4000);
    }
});



// Resaltar la fila de un ticket al pasar el mouse-************************************
document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        row.addEventListener("mouseover", () => row.style.backgroundColor = "#f0e67f");
        row.addEventListener("mouseout", () => row.style.backgroundColor = "#d9d9d9");
    });
});


//Implementar búsqueda de tickets en la tabla *****************************************
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".column-1 input");
    const tableRows = document.querySelectorAll("tbody tr");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        tableRows.forEach(row => {
            const ticketData = row.innerText.toLowerCase();
            row.style.display = ticketData.includes(searchTerm) ? "" : "none";
        });
    });
});

// Validar el formulario de creación tickets *****************************************
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const requiredFields = document.querySelectorAll("[required]");

    // Validar formato de correo electrónico
    emailInput.addEventListener("input", function () {
        if (!validateEmail(emailInput.value)) {
            emailInput.style.border = "2px solid red";
        } else {
            emailInput.style.border = "";
        }
    });

    // Validar que el teléfono solo contenga números
    telefonoInput.addEventListener("input", function () {
        telefonoInput.value = telefonoInput.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
    });

    // Evento antes de enviar el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío automático
        let valid = true;

        // Verificar campos vacíos y resaltarlos
        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                field.style.border = "2px solid red";
                valid = false;
            } else {
                field.style.border = "";
            }
        });

        if (!valid) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Confirmación antes de enviar
        if (confirm("¿Estás seguro de enviar este ticket?")) {
            form.submit(); // Envía el formulario si el usuario confirma
        }
    });

    // Función para validar el formato de email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});


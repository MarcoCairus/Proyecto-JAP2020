var usersArray = [];

//esta es la funcion que verificara que los datos que dio el ususario, se enc


document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("ingresar").addEventListener("click", function(e) {

        let inputEmail = document.getElementById("email");
        let inputPassword = document.getElementById("password");
        let camposCompletos = true;
        
        if (inputEmail.value === "") {
            camposCompletos = false;
        }

        if (inputPassword.value === ""){
            camposCompletos = false;
        }

        if (camposCompletos) {
                    if (inputEmail.value, inputPassword.value){
                        localStorage.setItem("Usuario-Logeado", email.value);
                        window.location = "inicio.html";
                    }

        }else{
            alert("Completa todos los campos porfavor")
        }
    });
});
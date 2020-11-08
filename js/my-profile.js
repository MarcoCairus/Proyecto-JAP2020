var usuario = '';

document.addEventListener('DOMContentLoaded', function () {
    let userLogged = localStorage.getItem('Usuario-Logeado');
    
        usuario = userLogged;
        let usuarioGuardado = localStorage.getItem(usuario.email);
        if (usuarioGuardado) {
            let usuarioGuardadoJSON = JSON.parse(usuarioGuardado);
            
            document.getElementById('nombres').value = usuarioGuardadoJSON.nombres;
            document.getElementById('apellidos').value = usuarioGuardadoJSON.apellidos;
            document.getElementById('edad').value = usuarioGuardadoJSON.edad;
            document.getElementById('email').value = usuarioGuardadoJSON.email;
            document.getElementById('telefono').value = usuarioGuardadoJSON.telefono;
        }
    
});



document.getElementById('perfil').addEventListener('submit', function (r) {
    r.preventDefault();
    
    let nombres = document.getElementById('nombres').value;
    let apellidos = document.getElementById('apellidos').value;
    let edad = document.getElementById('edad').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;

    localStorage.setItem(usuario.email, JSON.stringify({
        nombres: nombres,
        apellidos: apellidos,
        edad: edad,
        email: email,
        telefono: telefono
    }));
   window.location="my-profile.html";
});
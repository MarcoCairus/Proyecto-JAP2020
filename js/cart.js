let listaCart = [];




function calcSubtotal(costo){

    let count = parseInt(document.getElementById(`cantidad`).value);
    subtotal = count * costo;      
    document.getElementById(`precioSub`).innerHTML = subtotal; 
    calcEnvio();
}



function showCart(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        
        let articulos = array[i];

        let calcSub = articulos.unitCost * articulos.count;

        contenido += `
        <tr>
            <td><img src='${articulos.src}' width="100px"></td>

            <td>${articulos.name}</td>

            <td>${articulos.unitCost}</td>

            <td><input style="width:80px;" onchange="calcSubtotal(${articulos.unitCost})" 
                type="number" id="cantidad" class="form-control" value="${articulos.count}" min="1"></td>

            <td><span id="precioSub" style="font-weight:bold;">${calcSub}</span></td>
        </tr>
        `

        document.getElementById("cart").innerHTML = contenido;
    }
    
}

function metodoPago() {
    let formaPago = document.getElementsByName("formaPago");
    let infoUsuario = `<div>
    <input type="text" placeholder="Nombre del Propietario" name="tarjetaNombre" id="tarjetaNombre" class="form-control" required><br>

    <input type="number" placeholder="Numero de Tarjeta" name="tarjetaNumero" id="tarjetaNumero" class="form-control" required>
  
    

  </div>`
    let infoPago = `<div>                
    <label for="Banco">Banco:</label><br>
    <select name="Bancos" class="form-control">
    <option>BROU</option>
    <option>Santander</option>
    <option>Itaú</option>
    <option>ScotiaBank</option>
  </select><br>
  <input type="number" placeholder="Numero de Cuenta" name="tarjetaBanc" id="tarjetaBanc" class="form-control" required>
</div> `;

    for (let i = 0; i < formaPago.length; i++) {
        if (formaPago[i].checked && (formaPago[i].value) == "1") {
            document.getElementById("infoCard").innerHTML = infoUsuario ;
            document.getElementById("infoBank").innerHTML = " ";
        } else if (formaPago[i].checked && (formaPago[i].value) == "2") {
            document.getElementById("infoBank").innerHTML = infoPago;
            document.getElementById("infoCard").innerHTML = " ";
        }
    
    }
}

function calcEnvio(){
    let total = parseInt(document.getElementById("precioSub").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = (((parseInt(elements[i].value))*total)/100);
        }
    }

    let totalConEnvio = total + envio;

    let contenido = `
    <tr>
        <td>${total}</td>

        <td>${envio}</td>

        <td>${totalConEnvio}</td>

    </tr>
    `

    document.getElementById("totalEnvio").innerHTML = contenido;
}








document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaCart = resultObj.data.articles;
            showCart(listaCart);
            calcEnvio()
             
    }
    })
    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function(){
            calcEnvio()
        });
    }

    let formaPago = document.getElementsByName("formaPago");
    for (let i = 0; i < formaPago.length; i++) {
        formaPago[i].addEventListener("change", function (e) {
            metodoPago()
        })

    }
    

});
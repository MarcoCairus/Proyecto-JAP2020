let listaCart = [];




function calcSubtotal(costo){

    let count = parseInt(document.getElementById(`cantidad`).value);
    subtotal = count * costo;      
    document.getElementById(`precioSub`).innerHTML = subtotal;
   
}


function showLibros(array) {

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
                type="number" id="cantidad" value="${articulos.count}" min="1"></td>

            <td><span id="precioSub" style="font-weight:bold;">${calcSub}</span></td>
        </tr>
        `

        document.getElementById("cart").innerHTML = contenido;
    }
    
}








document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaCart = resultObj.data.articles;
            showLibros(listaCart);
             
    }
    })
    

});
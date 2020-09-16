var auto = {};
var commentsArray = []; 
var relacionados= [];


function productRel(listaProd, prodRel){
    let productosRelacionados="";
    
    
    prodRel.forEach(function(i){
        productosRelacionados+=`
        <div class="list-group-item list-group-item-action">
        <div class="row">
        <div class="col-3">
        <img src="${listaProd[i].imgSrc}"width="235"<br>>
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>${listaProd[i].name}</h4>
                <p>${listaProd[i].description}</p>
                </div>
        <a href="product-info.html"><button style="float: right;">Ver coche</button></a>
        </div>
        </div>
        </div>`
    })
    
    
    document.getElementById("rel").innerHTML=productosRelacionados
}


function showCar(auto, listaComentarios){
    let cont = "";
    let img = "";
    let comments = "";

cont +=  `<h2> ${auto.name} </h2>
          <p> ${auto.description} </p>     
`
img += `<img src="${auto.images[0]}" width="235">;<br>
        <img src="${auto.images[1]}" width="235">;<br>
        <img src="${auto.images[2]}" width="235">;<br>
        <img src="${auto.images[3]}" width="235">;<br>
        <img src="${auto.images[4]}" width="235">;<br><br><br><br><hr>
        `;       

        
        listaComentarios.forEach(function(comentario){
            let puntaje="";
             
            comments += `<strong>${comentario.user}</strong> :<br>
                         <p>${comentario.description}</p>
            `;
            for(let i = 1; i <= comentario.score; i++){
                puntaje += `<span class="fa fa-star checked"></span>`;
            }
            for(let i = comentario.score + 1; i <= 5; i++){
                puntaje +=`<span class="fa fa-star"></span>`;
            }
            comments += `<sub>${comentario.dateTime}</sub><br>`;
            comments += `<div style="text-align: right;">${puntaje}</div><hr>`;
            
        })


              


document.getElementById("contenido").innerHTML= cont;
document.getElementById("imagen").innerHTML= img;
document.getElementById("comentario").innerHTML= comments;
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
             
    }
    })


    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            auto = resultObj.data;
             showCar(auto, commentsArray);
}
})

getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        relacionados = resultObj.data;
         productRel(relacionados, auto.relatedProducts);
}
})

});

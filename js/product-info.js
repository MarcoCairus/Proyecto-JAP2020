var auto = {};
var commentsArray = [];

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
        <img src="${auto.images[4]}" width="235">;<br><br><br><br><hr>;
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


});

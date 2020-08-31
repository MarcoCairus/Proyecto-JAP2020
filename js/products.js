var productsArray = [];
var costMin = undefined
var costMax = undefined
const ORDER_ASC_DOLAR = "dolar-DOLAR"
const ORDER_DESC_DOLAR = "DOLAR-dolar"
const ORDER_DESC_SOLD = "Vendidos"

function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_DOLAR) {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            });

    }   else if (criterio === ORDER_DESC_DOLAR) {
        result = array.sort(

            function (a, b) {
                if (a.cost > b.cost){
                    return -1;
                }
                if (a.cost < b.cost){
                    return 1;
                }
                return 0;
            });

    } else if (criterio === ORDER_DESC_SOLD) {
        result = array.sort(function (a, b){
            if (a.soldCount > b.soldCount) {return -1;} 
            if (a.soldCount < b.soldCount) {return 1;}
            return 0;
        })
    }
    return result;
}
 
function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        
        if(((costMin == undefined) || (costMin != undefined && parseInt(product.cost) >= costMin)) &&
        ((costMax == undefined) || (costMax != undefined && parseInt(product.cost) <= costMax))){
           

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4>
                        <p>`+ product.description  +`</p>
                        </div>
                        <small class="text-muted">` + product.cost + ` USD</small>
                        <small class="text-muted">` + product.soldCount + ` Vendidos</small>
                    </div>

                </div>
            </div>
        </div>
        `
    }
        

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            productsArray = sortProducts(ORDER_ASC_DOLAR, productsArray);
            showProductList(productsArray);
        }

    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_ASC_DOLAR, productsArray);

        showProductList(productsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_DOLAR, productsArray);

        showProductList(productsArray);
    });
    document.getElementById("sortByCount").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_SOLD, productsArray);

        showProductList(productsArray);
    });
    document.getElementById("filtrar").addEventListener("click", function(){
        costMin = document.getElementById("min").value;
        costMax = document.getElementById("max").value;

        if((costMin != undefined) && (costMin != "") && (parseInt (costMin)) >=0) {
            costMin = parseInt(costMin);
        }
        else{
            costMin = undefined;
        }
        if((costMax != undefined) && (costMax != "") && (parseInt (costMax)) >=0) {
            costMax = parseInt(costMax);}
            else{
                costMax = undefined;
            }
            showProductList(productsArray);
});
document.getElementById("limpiar").addEventListener("click", function (){
    document.getElementById("min").value = "";
    document.getElementById("max").value = "";
    costMin = undefined;
    costMax = undefined;
    showProductList(productsArray);
});


});
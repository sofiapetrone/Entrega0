//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var min = undefined
var max = undefined 
var info = undefined 
var productsArray = [];

function showProductsList(productsArray){

    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){ 
        let product = productsArray[i];
        let buscar = product.name + product.description;
        if (((min == undefined) || (min != undefined && parseInt(product.cost) >= min)) &&
            ((max == undefined) || (max != undefined && parseInt(product.cost) <= max))) {
                if (( info == undefined) || (buscar.toLowerCase().indexOf(info) != -1)) {  


        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +` - `+ product.currency +` `+ product.cost +`</h4> 
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>

                </div>
            </div>
        </div>
        `
        }
            }
         
          document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        
    }
}



document.getElementById("asc").addEventListener("click",() => {
    ordenAsc();
}) 

document.getElementById("desc").addEventListener("click",() => {
    ordenDesc();
})

document.getElementById("rele").addEventListener("click",() => {
    let newArray = []
     productsArray.sort((a,b)=>{
        if (a.soldCount > b.soldCount){
            return 1;       
        }
        if (a.soldCount < b.soldCount){
            return -1;
        }else{
            return 0;
        }    
    });
    
    newArray = productsArray.reverse()
    showProductsList(newArray)

})

function ordenAsc(){
    ordenPrecios();
    
}

function ordenDesc(){
    let newArray= []
    ordenPrecios(productsArray);
    newArray = productsArray.reverse() ;
    showProductsList(newArray);

}

function ordenPrecios(){

    productsArray.sort((a,b)=>{
        if (a.cost > b.cost){
            return 1;       
        }
        if (a.cost < b.cost){
            return -1;
        }else{
            return 0;
        }    
    });
    
    showProductsList(productsArray)
}

function filtrar(){
    min= document.getElementById("min").value
    max= document.getElementById("max").value

    if ((min != undefined) && (min != "") && (parseInt(min)) >= 0) {
            min = parseInt(min);
        }
        else {
            min = undefined;
        }
    if ((max != undefined) && (max != "") && (parseInt(max)) >= 0) {
            max = parseInt(max);
        }
        else {
            max = undefined;
        }

        showProductsList(productsArray)
}

function search(){
    info = document.getElementById("buscador").value.toLowerCase()
    showProductsList(productsArray) 
    
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
    
});




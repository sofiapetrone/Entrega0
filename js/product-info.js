var comments = "";
var commentaries = "";
var comentarios = "";
var puntaje = "";
var hoy = new Date();
var fechaComment = (hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDay()+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds());
let usuario = JSON.parse(localStorage.getItem("usuario"));
let nombre = usuario.nombre;

//Funcion imagenes
var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
           
            

        </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
        
    }
}



//Funcion comentarios
function showComments(commentaries){    
    let comentarios = "";
    for(comments of commentaries){
       
        let valor = parseInt(comments.score);
        comentarios +=`
        <div class="list-group-item list-group-item-action">
            <div class="reviw-element"> 
            <h5 class="mb-1">`+ comments.user + `</h5> <p> ` + comments.dateTime +`</p> 
            <div id="puntaje" style="margin-bottom: 10px"> ${showChecks(valor)}</div>
        </div>
        <div>
        <p class="mb-1">` + comments.description + `</p>
        </div>
        </div> `;       
    }     
    document.getElementById("commentsProducts").innerHTML =  comentarios;
}

function comentar() {
//Le agrego el valor de la caja de comentarios
  comments = document.getElementById("cajatext").value;
  

  //Si el valor esta seleccionado, ese va a ser mi valor
  for (let i = 1; i <=5; i++) {
    if (document.getElementById(i).checked) {
      puntaje = document.getElementById(i).value;
    }
  }

  // Le agrego al array el nuevo comentario
    commentaries.push({
    score: puntaje,
    description: comments,
    user: nombre,
    dateTime: fechaComment,
  });

  showComments(commentaries);
}

// Calificacion
function showChecks(valor) {
  let checks = "";
  for (let i = 1; i < 6; i++) {
    if (i <= valor) {
      checks += `<i class="fa-solid fa-check" style="color: green"></i>`;
    } else {
      checks += `<i class="fa-solid fa-check" style="color: grey"></i>`;
    }
  }
  return checks;
}











//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                product = resultObj.data;
    
                let productNameHTML  = document.getElementById("productName");
                let productDescriptionHTML = document.getElementById("productDescription");
                let productCostHTML = document.getElementById("productCost");
                let productCurrencyHTML = document.getElementById("productCurrency");
                let productSoldcountHTML = document.getElementById("productSoldcount")
                let productCategoryHTML = document.getElementById("productCategory")
                let productRelatedproductsHTML = document.getElementById("productRelatedProducts")
            
                productNameHTML.innerHTML = product.name;
                productDescriptionHTML.innerHTML = product.description;
                productCurrencyHTML.innerHTML = product.currency + ` ` + product.cost;
                productSoldcountHTML.innerHTML = product.soldCount;
                //productCategoryHTML.innerHTML = product.category;
                productRelatedproductsHTML.innerHTML = product.relatedProducts;
    
                //Muestro las imagenes en forma de galería
                showImagesGallery(product.images);
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
               commentaries = resultObj.data;
                showComments(commentaries);
            }
        });
    });

  
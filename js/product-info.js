var comments = "";
var commentaries = "";
var comentarios = "";
var puntaje = "";
var productsArray = [];
var hoy = new Date();
var fechaComment = (hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDay()+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds());
let usuario = JSON.parse(localStorage.getItem("usuario"));


//Funcion imagenes
var product = {};

function showImagesGallery(array){
  

    let imagenes = "" ;

    imagenes = `
    
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${product.images[0]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${product.images[1]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${product.images[2]}" class="d-block w-100" alt="...">
    </div>
  <div class="carousel-item">
      <img src="${product.images[3]}" class="d-block w-100" alt="...">
    </div>
  <div class="carousel-item">
      <img src="${product.images[4]}" class="d-block w-100" alt="...">
    </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> `

    

        document.getElementById("productImagesGallery").innerHTML = imagenes;
        
    }



//Funcion muestra comentarios
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
 

//Funcion para comentar
function comentar() {
  let estrellas = 0;
  
  
//Le agrego el valor de la caja de comentarios
  comments = document.getElementById("cajatext").value;
  

  //Si el valor esta seleccionado, ese va a ser mi valor
  document.getElementsByName("estre").forEach((check) => {
    if (check.checked == true) {
      estrellas = check.value;
    }
  });

  // Le agrego al array el nuevo comentario
    commentaries.push({
    score: estrellas,
    description: comments,
    user: usuario.nombre,
    dateTime: fechaComment,
  });
  showComments(commentaries);
  Enviado();
  

  
}
   

// Calificacion
function showChecks(valor) {
  let estrella = "";
  for (let i = 1; i <=5; i++) {
    if (i <= valor) {
      estrella += `<span class="fa fa-star checked"></span>`;
    } else {
      estrella += `<span class="fa fa-star"></span>`;
    }
  }
  return estrella;
}

function Enviado(){
  Swal.fire({
      title: 'Envio exitoso',
      text: 'Gracias por compartirnos tu opinion!',
      icon: 'success',
      confirmButtonText: 'Continuar'
    })
}
/*Funcion productos relacionados*/
function relatedProducts(productosRelacionados){ 
  let pRelacionados = "";

for(let i = 0; i < productosRelacionados.length; i++){
  console.log(i);
pRelacionados += `
  <div class="col-3" ><img src="` + productsArray[productosRelacionados[i]].imgSrc + `" >
</div>`
}
document.getElementById("productRelated").innerHTML = pRelacionados;

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
                //let productCostHTML = document.getElementById("productCost");
                let productCurrencyHTML = document.getElementById("productCurrency");
                let productSoldcountHTML = document.getElementById("productSoldcount")
                
                
                
            
                productNameHTML.innerHTML = product.name;
                productDescriptionHTML.innerHTML = product.description;
                productCurrencyHTML.innerHTML = product.currency + ` ` + product.cost;
                productSoldcountHTML.innerHTML = "Unidades vendidas:" + ` ` + product.soldCount;
                
    
                //Muestro las imagenes 
                showImagesGallery(product);
                //Muestro productos relacionados
                relatedProducts(product.relatedProducts);
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


    /*Productos relacionados*/
    
    document.addEventListener("DOMContentLoaded", function(e){
      getJSONData(PRODUCTS_URL).then(function(resultObj){
          if (resultObj.status === "ok")
          {
            productsArray = resultObj.data;
          }            
          });  
        });       
        
        

      

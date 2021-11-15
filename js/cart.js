//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_INFO_UPDATE = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let carritoData = [];

function productsCarrito(carritoData) {
    let htmlContentToAppend = "";
    for (let i = 0; i < carritoData.length; i++) {
        let product = carritoData[i];
        

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" style="width:20cm; margin-left:auto; margin-right:auto;">
            <div class="row" >
                <div class="col-3">
                    <img src="` + product.src + `" alt="` + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + ` - ` + product.currency + `</h4><h4 class="precio">  ` + product.unitCost + `</h4> 
                        
                    </div>
                    <br>
                    <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <input class ="suma" type='number' value=`+ product.count + ` pro min="0" id='cant${i}' onchange='sumar()'>   
                    </div>
                    <br>
                    <span style="font-size:large"> Subtotal: $
                    <span id='sub${i}'>Subtotal: $ </span>
                    <button onclick="eliminar(${i});">Eliminar</button>
                    </span>
                    </div>
                    

                </div >
            </div >
        </div >
            `
}
document.getElementById("carrito").innerHTML = htmlContentToAppend;
sumar()
}

function sumar(){
    let precios = document.getElementsByClassName('precio'); //precios

    let cantidades = document.getElementsByClassName ('suma');//Array de input. Por lo tanto, tengo las cantidades

    let total=0;
    let subtotal=0;
    let costoEnvio=0;
    
    for (let i=0; i< precios.length; i++){

        total+= parseFloat(precios[i].innerHTML);
        subtotal+= parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
        
        document.getElementById('sub'+i).innerHTML = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
    }
    

    //ENVIOS
    let envios = document.getElementsByName("options");

    if(envios[0].checked){
      costoEnvio= (subtotal*0.15).toFixed(2)
      document.getElementById("precioEnvio").innerHTML = "Costo de envio:" + "" + "$" + costoEnvio;
    }

    if(envios[1].checked){
      costoEnvio= (subtotal*0.07).toFixed(2)
      document.getElementById("precioEnvio").innerHTML = "Costo de envio:" + "" + "$" + costoEnvio;
    }

    if(envios[2].checked){
      costoEnvio= (subtotal*0.05).toFixed(2)
     document.getElementById("precioEnvio").innerHTML = "Costo de envio:" + "" + "$" + costoEnvio;
    }

    document.getElementById('sum').innerHTML= parseFloat(subtotal) + parseFloat(costoEnvio);
    
}

function eliminar(i){
  carritoData.splice(i,1);
  if(carritoData.length=1){
    productsCarrito(carritoData);
    sumar()
  }else{
    document.getElementById('cant${i}').innerHTML="No hay articulos"
  }

}

//VALIDACION BOOTSTRAP
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

         



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_UPDATE).then(function (resultObj) {
        if (resultObj.status === "ok") {
          let productsArray = resultObj.data;
          carritoData = productsArray.articles
          productsCarrito(carritoData);
          

        }
      });
      
});
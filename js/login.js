//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.









function verificar(){

  let info = document.getElementById('user');
  let contrasena = document.getElementById('pass');
  let msj =document.getElementById('msj');
  let usuario = {};  

  if (info.value.trim() ==='' ){
        
        info.classList.add("esInvalido"); 

        msj.innerHTML="Dato requerido"; 
        msj.style.color="red"; 
        msj.style.display="block"; 
      
        
    }else if (contrasena.value.trim()===''){
        
        contrasena.classList.add("esInvalido"); 

        msj.innerHTML="Dato requerido"; 
        msj.style.color="red"; 
        msj.style.display="block"; 
      
      }else{

        location.href ="home.html";


        localStorage.setItem('usuario',JSON.stringify(usuario)); 
        
        sessionStorage.setItem('usuario',JSON.stringify(usuario));
    }

} 





document.addEventListener("DOMContentLoaded", function(e){

});




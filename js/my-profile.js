//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let usuario = JSON.parse(localStorage.getItem("usuario"));
let nombre;
let apellido;
let edad;
let email;
let telefono;

function guardarData(){
    

    usuario.nombre = String(document.getElementById("nombre").value);
    usuario.apellido = String(document.getElementById("apellido").value);
    usuario.email = String(document.getElementById("email").value);
    usuario.edad = parseFloat(document.getElementById("edad").value);
    usuario.telefono = parseFloat(document.getElementById("telefono").value);
    
    localStorage.setItem('usuario',JSON.stringify(usuario));
    sessionStorage.setItem('usuario',JSON.stringify(usuario));
}


function mostrarData(){
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    data =`
    <div class="form-group">
            
                
                    <p class="subtitle">NOMBRE: ${usuario.nombre}</p> 
                
                
                    <p class="subtitle">APELLIDO: ${usuario.apellido}</p>
                
                
                    <p class="subtitle">EMAIL: ${usuario.email}</p>
                
                
                    <p class="subtitle">EDAD: ${usuario.edad}</p>
                
                
                    <p class="subtitle">TELEFONO DE CONTACTO: ${usuario.telefono}</p>
               
            
        </div>
        
    `;

    document.getElementById("mostrarData").innerHTML = data;
    
}

document.addEventListener("DOMContentLoaded", ()=>{
  
mostrarData()

});




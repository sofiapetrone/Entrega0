function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
   /* console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());*/
    // The ID token you need to pass to your backend:

    let usuario={};

    usuario.nombre=profile.getGivenName();
    usuario.imagen = profile.getImageUrl();
    usuario.estado="conectado";
    localStorage.setItem('usuario',JSON.stringify(usuario)); 
   /* var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);*/
    location.href ="home.html";
    
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      //Lo que quiero hacer cuando me desconecto
    });
  }

  function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
    
  }
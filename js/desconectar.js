function desconectar() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      //Lo que quiero hacer cuando me desconecto
    });
  }


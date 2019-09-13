



















  createUser(){

    const loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();

    var promise = this.usuario.cargarDatos(this.username, this.password);
    promise.subscribe(data => {
      loader.dismiss();
      if(data.status == 200){
      if(data.json().status == 200 && data.json().data.info.companyid == this.usuario.companyid || data.json().data.info.companyid == 227 /* && data.json().data.online == 1*/ ){
          this.cargarLogin();
          this.storage.set('usuario', data.json().data.info.userid);
          this.storage.set('data',data.json().data.info);
          this.storage.set('folio', data.json().data.info.companyid);
          this.datos.userid = data.json().data.userid;
          this.datos.officeid = data.json().data.officeid;
          this.datos.companyid = data.json().data.companyid;

          this.storage.set('assign', this.datos);

          this.events.publish('user:created', data.json().data.info, Date.now());

        }else if(data.json().status == 404){
          const alerta = this.alertCtrl.create({
            title: 'ERROR AL INICIAR SESSION',
            subTitle: 'Revisa bien tu usuario o contraseña',
            buttons: ['ok']
          });
          alerta.present();
        }else{
          const alerta = this.alertCtrl.create({
            title: 'ERROR AL INICIAR SESSION',
            subTitle: 'revisa bien tu usuario y contraseña',
            buttons: ['ok']
          });
          alerta.present();
        }
      }else{
        const alerta = this.alertCtrl.create({
          title: 'ERROR AL INICIAR SESSION',
          subTitle: 'revisa bien tu usuario y contraseña',
          buttons: ['ok']
        });
        alerta.present();
      }
    });




  }


  cargarLogin(){
    /*const loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
    }, 2000);*/

  }


  registrarUser(){
    const modal = this.modalCtrl.create(RegistrarPage);
    modal.present();
  }






}

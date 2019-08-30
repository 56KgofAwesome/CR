import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  Events,
  LoadingController,
  ModalController 
} from 'ionic-angular';
import { 
  RegistrarPage
 } from "../index.paginas";
 import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  Nusuario    : any;
  contrasena  : any;
  datos       : any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public usuario: UsuarioProvider,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {
    /*this.ga.startTrackerWithId('135891659')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('test');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));*/
  }


  irABuscar(){
    
  }


  createUser(){
    const loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();

    var promise = this.usuario.cargarDatos(this.Nusuario, this.contrasena);
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

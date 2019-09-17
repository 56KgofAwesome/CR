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
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username    : any;
  password  : any;
  datos       : any = [];
  loginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public usuario: UsuarioProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder
  ) {
    /*this.ga.startTrackerWithId('135891659')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('test');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));*/
   this.loginForm = this.formBuilder.group({
     username: new FormControl('', Validators.compose([
       Validators.required,
       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
     ])),
     password: new FormControl('',Validators.required)
   })
  }
  //----------------------------------------------------------------------------
  //Login del usuario
  loginUser(){
    this.usuario.login(this.username,this.password);
  }
  //----------------------------------------------------------------------------
  irABuscar(){

  }
}

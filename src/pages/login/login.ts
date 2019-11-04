import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Events, LoadingController, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username    : any;
  password    : any;
  datos       : any = [];
  loginForm: FormGroup;
constructor( public navCtrl: NavController, public navParams: NavParams, public events: Events,public loadingCtrl: LoadingController,
              public modalCtrl: ModalController, public usuario: UsuarioProvider, private storage: Storage,public alertCtrl: AlertController,
              public formBuilder: FormBuilder
) {
    //Valida el formato del formulario
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
    Promise.all([
      this.usuario.login(this.username,this.password)
    ]).then(data=>{
        if(data[0] == true){
          this.events.publish('user:created');
        }else{
          this.incorrectAlert();
        }
    })
  }
  //---------------------------------------------------------------------------------------------------------------
  //Alerta de Datos incorrectos
  incorrectAlert(){
    let alert = this.alertCtrl.create({
      title: 'Datos incorrectos',
      message: 'Revisa bien los datos ingresados',
    });
    alert.present();
  }
}

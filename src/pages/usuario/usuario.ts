import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  IonicPage,
  NavController,
  NavParams,
  Events
} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
//import { UsuarioProvider } from '../../providers/usuario/usuario';
//import { Tabs2Page } from '../tabs2/tabs2';
//import { TabsUsuarioPage } from '../tabs-usuario/tabs-usuario';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  activo1:boolean = false;
  activo2:boolean = false;
  activo3:boolean = false;
  datosUsuario:any = {};
  datos:any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private storage: Storage,
    public usuario: UsuarioProvider,
    private statusBar: StatusBar
  ){

    }
    ionViewWillEnter(){
        Promise.all([
          this.usuario.getUserData()
        ]).then(data=>{
          this.datosUsuario = data[0];
        })
    }
    ionViewCanEnter(){
        this.events.subscribe('user:created', (data, time) =>{
        })

      /*this.storage.get('usuario').then(data => {
        if(data == null){

        }else{
        }
      });*/
    }

  ionViewDidLoad() {

  }

  cerrarSesion(user = 'cerraste sesion'){
    this.events.publish('user:logOut', user, Date.now());
    this.storage.set('userToken', null);
    this.storage.set('dataUser', null);
  }

  desplegar(seccion:any){
    if(seccion == 1){
      if(this.activo1 == false){
        var elemento = document.getElementById("seccion1");
        var icono = document.getElementById("icono1").removeAttribute('name');
        icono = document.getElementById("icono1").setAttribute("name", "arrow-up")
        elemento.classList.add("visible");
        elemento.classList.remove("invisible");
        this.activo1 = true;
      }else{
        var elemento = document.getElementById("seccion1");
        elemento.classList.add("invisible");
        elemento.classList.remove("visible");
        this.activo1 = false;
      }
    }else if(seccion == 2){
      if(this.activo2 == false){
        var elemento = document.getElementById("seccion2");
        elemento.classList.add("visible");
        elemento.classList.remove("invisible");
        this.activo2 = true;
      }else{
        var elemento = document.getElementById("seccion2");
        elemento.classList.add("invisible");
        elemento.classList.remove("visible");
        this.activo2 = false;
      }
    }else if(seccion == 3){
      if(this.activo3 == false){
        var elemento = document.getElementById("seccion3");
        elemento.classList.add("visible");
        elemento.classList.remove("invisible");
        this.activo3 = true;
      }else{
        var elemento = document.getElementById("seccion3");
        elemento.classList.add("invisible");
        elemento.classList.remove("visible");
        this.activo3 = false;
      }
    }
  }




}

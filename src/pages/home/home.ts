import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { 
  DestinosPage,
  ContactosPage,
  FormularioPage,
  LoginPage,
  BuscarPage,
  InfoPage
 } from '../index.paginas';
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public events: Events
  ) {

console.log("home");
    
  }
  
  

  irAPagina(destino){
    if(destino === 'login'){
      this.navCtrl.push(LoginPage);
    }else if(destino === 'buscar'){
      this.navCtrl.push(BuscarPage);
    }else if(destino === 'destinos'){
      this.navCtrl.push(DestinosPage);
    }else if(destino === 'nosotros'){
      this.navCtrl.push(InfoPage);
    }else if(destino === 'contactos'){
      this.navCtrl.push(ContactosPage);
    }
  }



}

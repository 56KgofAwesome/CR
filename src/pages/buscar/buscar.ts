import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { 
  LoginPage,
  DestinosPage,
  InfoPage,
  ContactosPage,
  FormularioPage,
  ResultadosPage
 } from '../index.paginas';

/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }



  irAresultado(destino){
    this.navCtrl.push(FormularioPage, {'destino':destino});   //----- nav para llegar al buscador-----
    //this.navCtrl.push(ResultadosPage, {'destino':null,'tipo':destino});
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

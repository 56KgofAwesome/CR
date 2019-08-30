import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {  
  VerDesarrolloPage,
  VerPropiedadPage
} from '../index.paginas';
import { PropiedadesProvider } from '../../providers/propiedades/propiedades';
/**
 * Generated class for the FiltroResultadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtro-resultados',
  templateUrl: 'filtro-resultados.html',
})
export class FiltroResultadosPage {
  destino         : any = null;
  resultados      : any[];
  slider          : any[];
  datosFiltrados  : any[];
  servicios       : any[];
  amenidades      : any[];
  tipo            : any = null;
  metros          : any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public propiedadesProvider: PropiedadesProvider,
    public loadingCtrl: LoadingController
  ) {
    this.destino = this.navParams.get('destino');
    this.tipo = this.navParams.get('tipo');
  }

ionViewCanEnter(){



  
}




}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { 
  ResultadosPage,
  FiltroResultadosPage
 } from '../index.paginas';
 import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  activo:boolean = false;
  tipoFormulario    : any;
  precio            : any;
  operacion         : any;
  propiedad         : any;
  recamaras         : any;
  baños             : any;
  datos             : any={
    'lower': 0, 
    'upper': 50000000
  };
  metros            : any={
    'lower': 0,
    'upper': 10000
  }
  metroslot            : any={
    'lower': 0,
    'upper': 10000
  }
  formatoLower      : any;
  formatoUpper      : any;
  formatoLower2     : any;
  formatoUpper2     : any;
  $_SESSION;
  //rango = {'lower': 18, 'upper': 100}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage
  ) {
    this.tipoFormulario = this.navParams.get('destino');
    this.storage.get('usuario').then(data=>{
      this.$_SESSION = data;
    })
  }

  ionViewDidLoad() {
    if(this.tipoFormulario == 'propiedades'){
      var elementoPropiedad = document.getElementById("Fpropiedades");
      elementoPropiedad.classList.add("visible");
      elementoPropiedad.classList.remove("invisible");
    }else{
      var elementoPropiedad = document.getElementById("Fdesarrollos");
      elementoPropiedad.classList.add("visible");
      elementoPropiedad.classList.remove("invisible");
    }
  }

  logForm(tipo:any){
    if(tipo == 'propiedad'){
      this.navCtrl.push(ResultadosPage, {'datos':this.datos,tipo, 'metros': this.metros, 'metroslot': this.metroslot});
    }else{
      this.navCtrl.push(ResultadosPage, {'datos':this.datos,tipo});
    }

  }

  avanzado(){
    if(this.activo == false){
      var elemento = document.getElementById("avanzado");
      elemento.classList.add("visible");
      elemento.classList.remove("invisible");
      this.activo = true;
    }else{
      var elemento = document.getElementById("avanzado");
      elemento.classList.add("invisible");
      elemento.classList.remove("visible");
      this.activo = false;
    }
  }

  avanzado2(){
    if(this.activo == false){
      var elemento = document.getElementById("avanzado2");
      elemento.classList.add("visible");
      elemento.classList.remove("invisible");
      this.activo = true;
    }else{
      var elemento = document.getElementById("avanzado2");
      elemento.classList.add("invisible");
      elemento.classList.remove("visible");
      this.activo = false;
    }
  }

  setPrecioVista(){
    this.formatoLower = new Intl.NumberFormat('en-ES').format(this.datos.lower);
    this.formatoUpper = new Intl.NumberFormat('en-ES').format(this.datos.upper);
  }

  setMetrosVista(){
    this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metros.lower);
    this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metros.upper);
  }

  setMetroslotVista(){
    this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metroslot.lower);
    this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metroslot.upper);
  }

}

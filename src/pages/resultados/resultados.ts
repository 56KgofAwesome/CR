import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { 
  VerDesarrolloPage,
  VerPropiedadPage,
  LoginPage,
  BuscarPage,
  DestinosPage,
  InfoPage,
  ContactosPage
 } from '../index.paginas';
 import { PropiedadesProvider } from '../../providers/propiedades/propiedades';
 import { Storage } from '@ionic/storage';
import { DocumentsPage } from '../documents/documents';


@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class ResultadosPage {
  destino         : any = null;
  resultados      : any[];
  slider          : any[];
  datosFiltrados  : any[];
  servicios       : any[];
  amenidades      : any[];
  tipo            : any = null;
  metros          : any[];
  metroslot       : any[];
  $_SESSION;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public propiedadesProvider: PropiedadesProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.destino = this.navParams.get('destino');
    this.tipo = this.navParams.get('tipo');
    this.storage.get('usuario').then(data=>{
      this.$_SESSION = data;
    })
  }

  ionViewCanEnter(){


    if(this.resultados == null){
      var loader = this.loadingCtrl.create({
        dismissOnPageChange: false
      });
      loader.present();
      if(this.destino == null ){
        if(this.tipo == 'propiedad'){
          this.datosFiltrados = this.navParams.get('datos');
          this.metros = this.navParams.get('metros');
          this.metroslot = this.navParams.get('metroslot');

          
          var promise = this.propiedadesProvider.filtrarPropiedad(this.datosFiltrados, this.metros, this.metroslot);
          promise.subscribe(data=>{
            if(data.json().status == 200){
              this.resultados = data.json().data;
                var result = document.getElementById('resultados');
                result.classList.add("aparecer");
                result.classList.remove("ocultar");
            }else{
              
            }
            loader.dismiss();
          });
        }else{
          this.datosFiltrados = this.navParams.get('datos');
          var promise = this.propiedadesProvider.filtrarDesarrollo(this.datosFiltrados);
          promise.subscribe(data=>{
            if(data.json().status == 200){
              this.resultados = data.json().data;
                var result = document.getElementById('resultados');
                result.classList.add("aparecer");
                result.classList.remove("ocultar");
            }else{
  
            }
  
            loader.dismiss();
          });
        }
  
      }else{
        var promise = this.propiedadesProvider.cargarPorCiudad(this.destino);
        promise.subscribe(data=>{
          this.resultados = data.json().data;
            var result = document.getElementById('resultados');
            result.classList.add("aparecer");
            result.classList.remove("ocultar");
          loader.dismiss();
        });
      }
  




    }






  }






  irAPropiedad(index:any){
      this.navCtrl.push(VerPropiedadPage, {index});
  }




  irADesarrollo(index:any){
    
      this.navCtrl.push(VerDesarrolloPage, {index});
    //this.navCtrl.push(VerPropiedadPage, {index});
  }


  obtenerSlider(slider:any){
    for(let i =0; i < slider.length; i++){

    }
  }

  getDocuments(idDevelopment){
    this.navCtrl.push(DocumentsPage,{'development':idDevelopment,'user':this.$_SESSION});
    /*var promise = this.propiedadesProvider.getDocuments(idDevelopment, this.$_SESSION);
    promise.subscribe(data=>{
      //console.log(data.json().data);

      console.log(data.json());
      console.log("datos");
    });*/


  }


}

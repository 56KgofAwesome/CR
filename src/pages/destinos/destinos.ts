import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ResultadosPage } from '../index.paginas';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-destinos',
  templateUrl: 'destinos.html',
})
export class DestinosPage {
  destinos    : any;
  respuesta   : boolean = false;
  length      : number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private usuarioProvider: UsuarioProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewCanEnter() {

    if(this.destinos == null){


      const loader = this.loadingCtrl.create({
        dismissOnPageChange: false
      });
      loader.present();
      var promise = this.usuarioProvider.cargarDestino();
      promise.subscribe(data => {   
        if(data.status == 200){
          if(data.json().status == 200){
            this.destinos = data.json().data;
            this.length = this.destinos.length;
            if(this.length != 0){
              setTimeout(() => {
                var destinos = document.getElementById("destinos");
                destinos.classList.add("aparecer");
                destinos.classList.remove("ocultar");
              }, 1000);
              //this.respuesta = true;
            }else{
              setTimeout(() => {
                var mensaje = document.getElementById("destinos");
                mensaje.classList.add("aparecer");
                mensaje.classList.remove("ocultar");
                document.getElementById("destinos").innerHTML = '<p>No hay registros</p>';

              }, 1000);
            }

          }else{
  
          }
        }else{
  
        }
      });
      setTimeout(() => {
        loader.dismiss();
      }, 1000);


    }


  }


  irApagina(destino:any){
    this.navCtrl.push(ResultadosPage, {destino, 'tipo':'desarrollo'});
  }
}

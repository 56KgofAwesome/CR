import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PropiedadesProvider } from '../../providers/propiedades/propiedades';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SharingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sharing',
  templateUrl: 'sharing.html',
})
export class SharingPage {
  resultados      : any[];
  tipo            : any = null;
  datosFiltrados  : any[];
  metros          : any[];
  metroslot       : any[];
  nombreC         : any;
  mailC           : any;
  folio           : any;
  idUsuario       : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public propiedadesProvider: PropiedadesProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private storage: Storage
    ) {

      this.storage.get('usuario').then(data=>{
        this.idUsuario  = data;
      })

    this.tipo = this.navParams.get('tipo');
    this.nombreC = this.navParams.get('nombre');
    this.mailC  = this.navParams.get('mail');
    this.folio= this.navParams.get('folio');
  }

  ionViewCanEnter(){
    if(this.tipo == 'propiedades'){
      var loader = this.loadingCtrl.create({
        dismissOnPageChange: false
      });
      loader.present();
      var promise = this.propiedadesProvider.sharingPropiedad();
      promise.subscribe(data=>{
        if(data.json().status == 200){
          this.resultados = data.json().data;
          setTimeout(()=>{
            var result = document.getElementById('resulta2');
            result.classList.add("aparecer");
            result.classList.remove("ocultar");
          }, 1000);
        }else{
          
        }

      });
    }else{
      var loader = this.loadingCtrl.create({
        dismissOnPageChange: false
      });
      loader.present();
      var promise = this.propiedadesProvider.sharingDesarrollo();
      promise.subscribe(data=>{
        if(data.json().status == 200){
          this.resultados = data.json().data;
          setTimeout(()=>{
            var result = document.getElementById('resulta2');
            result.classList.add("aparecer");
            result.classList.remove("ocultar");
          }, 1000);
        }else{

        }


      });
    }

    setTimeout(()=>{
      loader.dismiss();
    }, 1000);
  }

  share(id:any){
    var loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();

    var promise = this.propiedadesProvider.compartirPropiedad(id, this.idUsuario, this.folio, this.nombreC, this.mailC);

    promise.subscribe(data=>{
      if(data.status = 200){
        setTimeout(()=>{
          loader.dismiss();
        }, 1000);
        const alerta = this.alertCtrl.create({
          title: 'ENVIADO',
          subTitle: 'La información de la propiedad a sido enviada',
          buttons: ['ok']
        });
        setTimeout(()=>{
          alerta.present();
          this.navCtrl.pop();
        }, 1000)
      }else{

        setTimeout(()=>{
          loader.dismiss();
        }, 1000);
        const alerta = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'intente mas tarde',
          buttons: ['ok']
        });
        setTimeout(()=>{
          alerta.present();
          this.navCtrl.pop();
        }, 1000)

      }
    })


  }
  
  
  shareDev(id:any){
    var loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();

    var promise = this.propiedadesProvider.compartirDesarrollo(id, this.idUsuario, this.folio, this.nombreC, this.mailC);

    promise.subscribe(data=>{
      if(data.status = 200){
        setTimeout(()=>{
          loader.dismiss();
        }, 1000);
        const alerta = this.alertCtrl.create({
          title: 'ENVIADO',
          subTitle: 'La información del desarrollo a sido enviado',
          buttons: ['ok']
        });
        setTimeout(()=>{
          alerta.present();
          this.navCtrl.pop();
        }, 1000)
      }else{

        setTimeout(()=>{
          loader.dismiss();
        }, 1000);
        const alerta = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'intente mas tarde',
          buttons: ['ok']
        });
        setTimeout(()=>{
          alerta.present();
          this.navCtrl.pop();
        }, 1000)

      }
    })


  }   





}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EmailComposer } from '../../../node_modules/@ionic-native/email-composer';
import { SeguimientoPage } from '../seguimiento/seguimiento';
import { Storage } from '@ionic/storage';
import { SharingPage } from '../index.paginas';
import { GeneralFormPage } from '../general-form/general-form';

/**
 * Generated class for the VerContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-contacto',
  templateUrl: 'ver-contacto.html',
})
export class VerContactoPage {
  activo1     :boolean  = false;
  activo2     :boolean  = false;
  activo3     :boolean  = false;
  seccion     :string   = "datos";
  idContacto  :any;
  datos       : any     = [];
  comentarios : any     = {};
  tipo        : any;
  idUsuario   : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioProvider: UsuarioProvider,
    private emailComposer: EmailComposer,
    private storage: Storage,
    public modalCtrl: ModalController
  ) {
  }

  ionViewCanEnter(){
    this.idContacto = this.navParams.get("id");
    this.tipo  = this.navParams.get("tipo");

    this.storage.get('usuario').then(data=>{
       this.idUsuario = data;


      if(this.tipo == 'c'){

        var promise = this.usuarioProvider.verContacto(this.idContacto, this.idUsuario);
        promise.subscribe(data=>{
          this.datos  = data.json().data.visit;
          this.comentarios = data.json().data.comments;
          //this.contactos = data.json().data;
        })
  
      }else{
  
        var promise = this.usuarioProvider.verContactoReferido(this.idContacto, this.idUsuario);
        promise.subscribe(data=>{
          this.datos  = data.json().data.visit;
          this.comentarios = data.json().data.comments;
          //this.contactos = data.json().data;
        })      
  
      }


    });





  }


  mensajear(correo:any){
    this.emailComposer.isAvailable().then((available: boolean) => {
      if(available){
      }
    });

    let email = {
      to: correo,
      cc: '',
      bcc: [],
      subject: 'Asunto',
      body: 'Ingresa el mensaje',
      isHtml: true
    };

    this.emailComposer.open(email);
    /*let modal = document.getElementById("modal");
    //let span = document.getElementsByClassName("close");

    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }*/
  }

  seguimiento(){

    if(this.tipo == 'c'){
      this.navCtrl.push(SeguimientoPage, {'contacto': this.datos, 'tipo': this.tipo});
    }else{
      this.navCtrl.push(SeguimientoPage, {'contacto': this.datos, 'tipo': this.tipo});
    } 


    
  }


  sharing(tipo:any){
    //if(tipo == 'propiedades'){
      this.navCtrl.push(SharingPage,{'tipo': tipo, 'nombre': this.datos.nombre + ' ' +this.datos.ap_paterno, 'mail': this.datos.email, 'folio': this.datos.visitid});
    /*}else{
      this.navCtrl.push(SharingPage,{'tipo': tipo, 'nombre': this.datos.nombre, 'mail': this.datos.email, 'folio': this.datos.visitid});
    }*/

  }


  cerrarModal(){
    let modal = document.getElementById("modal");
    modal.style.display = "none";
  }  

  openForm(datos, nombre){
    const modal = this.modalCtrl.create(GeneralFormPage, {'id':this.tipo,'visitid':datos, 'fullname': nombre});
    modal.present();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController,ToastController,LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EmailComposer } from '../../../node_modules/@ionic-native/email-composer';
import { SeguimientoPage } from '../seguimiento/seguimiento';
import { SharingPage } from '../index.paginas';
import { GeneralFormPage } from '../general-form/general-form';
import { Storage } from '@ionic/storage';
import { ContactosProvider } from '../../providers/contactos/contactos';
import { ElementEnablerProvider } from '../../providers/element-enabler/element-enabler';
import  moment  from 'moment';
import 'moment/locale/es';
import { stringify } from '@angular/core/src/util';

@IonicPage()
@Component({
  selector: 'page-ver-contacto',
  templateUrl: 'ver-contacto.html',
})
export class VerContactoPage {
  activo1       : boolean  = false;
  activo2       : boolean  = false;
  activo3       : boolean  = false;
  seccion       : string   = "datos";
  contactId     : any;
  datos         : any     = [];
  comentarios   : any     = {};
  tipo          : any;
  idUsuario     : any;
  date          : any;
  moments       : any;

  registerTime  : any;
  datosEnvio    : any      =[];
  token         : any;
  officeUser    : any;
  comment       : any;

  showElements  : any = {};

  constructor(public navCtrl: NavController,public navParams: NavParams,public usuarioProvider: UsuarioProvider,private emailComposer: EmailComposer,
              public modalCtrl: ModalController,public contactosProvider: ContactosProvider,public alertCtrl: AlertController,private storage: Storage,
              public toastController: ToastController,public loadingCtrl: LoadingController,private enabler: ElementEnablerProvider
  ){
    
  }
  //--------------------------------------------------------------------------
  ionViewCanEnter(){
    this.showElements = this.enabler.verContactoEnabler();
    this.contactId = this.navParams.get("id");
    this.tipo  = this.navParams.get("tipo");
    //Verifica si el usuario es visita o prospecto
      if(this.tipo == 'c'){
        var promise = this.contactosProvider.getContactInfo(this.contactId, this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
        promise.subscribe(data=>{
          this.datos  = data.json().data.visit;
          this.comentarios = data.json().data.comments;
          this.dateAgo(this.datos.createdate);
          var shortCreateDate = this.datos.createdate.substring(0,16);
          console.log(shortCreateDate);
        })
      }else{
        var promise = this.contactosProvider.getReferedContactInfo(this.contactId,this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
        promise.subscribe(data=>{
          this.datos  = data.json().data.visit;
          this.comentarios = data.json().data.comments;
          this.dateAgo(this.datos.createdate);
          console.log(this.comentarios);

        })
      }
  }
  //----------------------------------------------------------------------------
  //Obtiene el tiempo estimado de registro del usuario
  dateAgo(dataDate: any){
    return this.registerTime = moment(dataDate).fromNow();
  }
  //----------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------
  //Abre el modal de nuevo seguimiento
  newComment(){
    if(this.tipo == 'c'){
      this.navCtrl.push(SeguimientoPage, {'contacto': this.datos, 'tipo': this.tipo});
    }else{
      this.navCtrl.push(SeguimientoPage, {'contacto': this.datos, 'tipo': this.tipo});
    }
  }
  //----------------------------------------------------------------------------
  //Nuevo Seguimiento
  newCommentModal(){
    this.datosEnvio.folio = this.datos.visitid;
    this.datosEnvio.comment = '';
    this.storage.get('dataUser').then(data=>{
      this.datosEnvio.office = this.matchOffice(data,this.datos.office);
      this.datosEnvio.companyid = data.companyid;
      this.datosEnvio.user = data.userid;
      this.datosEnvio.creatorid = data.userid;
      this.token = data.token;
    });
    //Alerta input del seguimiento
    const comment = this.alertCtrl.create({
      title: 'Nuevo Seguimiento',
      subTitle: this.datos.fullname,
      cssClass:'prompt_alert',
      message: 'Folio: '+this.datos.visitid,
      inputs:[
          {
            name: 'comment',
            placeholder: 'Detalles del seguimiento'
          }
      ],
      buttons: [
        {
          text: 'ok',
          handler: data => {
            let dataComment = data['comment'].trim();
            if(this.isBlank(dataComment) === true){
              this.errorCommentBlank();
            }else{
              this.datosEnvio.comment = this.isBlank(dataComment);
              var promise = this.contactosProvider.addComment(this.datosEnvio,this.tipo,this.token);
              this.sendComment(promise);
            }
          }
        }
      ]
    });
    comment.present();
  }
  //----------------------------------------------------------------------------
  //Verifica que la oficina a la que pertenezca el usuario sea la misma que la del comprador, para el registro del comentario
  matchOffice(userData: any,officeBuyer: any){
    //Obtención de la primera oficina
    let officesData = userData.officeid.replace(/ /g,''), //Elimina espacios en blanco del string de oficinas
        officesDataSplit = officesData.split(","),        //Crea un arreglo con las oficinas a las que pertenec el usuario
        officeUser = officesDataSplit[0];                 //Obtiene la primera oficina a la que pertenece el usuario
     var ans = (officeUser == officeBuyer) ? officeBuyer : officeUser;
     return ans;
  }
  //----------------------------------------------------------------------------
  //Valida si el comentario de seguimiento no es en blanco
  isBlank(comment: any){
    var ans = (comment == '') ? true : comment;
    return ans;
  }
  //----------------------------------------------------------------------------
  //Toast mensaje de error por comentario en blanco
  async errorCommentBlank() {
    const toast = await this.toastController.create({
      message: 'Error: No puedes añadir un comentario de seguimiento en blanco',
      duration: 2500,
      position: 'bottom',
      cssClass: 'toast-scheme'
    });
    toast.present();
  }
  //----------------------------------------------------------------------------
  //Toast mensaje de error
  async errorComment() {
    const toast = await this.toastController.create({
      message: 'Error: No pudimos almacenar tu comentario',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-scheme'
    });
    toast.present();
  }
  //----------------------------------------------------------------------------
  //Almecena el comentario de seguimiento
  sendComment(promise: any){
    const loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();
    promise.subscribe(data=>{
      loader.dismiss();
      if(data.status == 200){
        const alerta = this.alertCtrl.create({
          title: 'Éxito',
          subTitle: 'El seguimiento fue creado correctamente',
          buttons: ['ok']
        });
        alerta.present();
      }else{
        this.errorComment();
      }
    });
  }
  //----------------------------------------------------------------------------
  sharing(tipo:any){
    //if(tipo == 'propiedades'){
      this.navCtrl.push(SharingPage,{'tipo': tipo, 'nombre': this.datos.nombre + ' ' +this.datos.ap_paterno, 'mail': this.datos.email, 'folio': this.datos.visitid});
    /*}else{
      this.navCtrl.push(SharingPage,{'tipo': tipo, 'nombre': this.datos.nombre, 'mail': this.datos.email, 'folio': this.datos.visitid});
    }*/

  }

/*
  cerrarModal(){
    let modal = document.getElementById("modal");
    modal.style.display = "none";
  }
*/
  openForm(datos, nombre){
    const modal = this.modalCtrl.create(GeneralFormPage, {'id':this.tipo,'visitid':datos, 'fullname': nombre});
    modal.present();
  }

}

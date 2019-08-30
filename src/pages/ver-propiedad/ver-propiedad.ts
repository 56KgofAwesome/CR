import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  Platform,
  AlertController,
  PopoverController,
  LoadingController
} from 'ionic-angular';
import { SocialSharing } from "@ionic-native/social-sharing";
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '../../../node_modules/@ionic-native/email-composer';
import { PropiedadesProvider } from '../../providers/propiedades/propiedades';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ChangeDetectorRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GeneralFormPage } from '../index.paginas';



declare var google: any;


@IonicPage()
@Component({
  selector: 'page-ver-propiedad',
  templateUrl: 'ver-propiedad.html',
})
export class VerPropiedadPage {
  public map        : any; 
  public imageIcon  : any ; 
  public mapstyle   : any;
  public mapProp    : any ;
  public mapView    = true;
  folio             :any;
  datos             :any  = [];
  agente            :any  = [];
  slider            :any  = [];
  tipo              :any  = 'interiores';
  servicios         :any[];
  amenidades        :any[];
  comentarios       :any  = {};
  comentariosMail   :any  = {};
  idUsuario         :any  = null;
  precios           :any  = {};
  operacion         :any  = {};
  exteriores        :any  = [];
  interiores        :any  = [];
  aux               :any  = {};
  aux2              :any  = {};
  mapLat            :number;
  mapLong           :number;
  URL               :any  ='';
  errorM            :Boolean = false;
  datosMailDB       :any  = {};
  ImagenSlide       :any;
  showToolbar       :boolean = false;
  public fMail      :FormGroup;
  $_SESSION;
  dataSession:any={};
  agenteNombre:any;
  agenteMail:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    public propiedadesProvider: PropiedadesProvider,
    private storage: Storage,
    public plt: Platform,
    public formBuilder:FormBuilder,
    public usuarioProvider:UsuarioProvider,
    private alertCtrl: AlertController,
    public ref: ChangeDetectorRef,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController
  ){


    if(this.interiores != undefined){
      this.tipo = 'interiores';
    }else if(this.exteriores != undefined){
      this.tipo = 'exteriores';
    }
    this.fMail = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      comentario: ['', Validators.required]
    })

    this.geolocation.getCurrentPosition().then((resp) => {
     }).catch((error) => {
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });

     this.storage.get('usuario').then(data=>{
       this.idUsuario = data;
     })


  }

  ionViewWillEnter(){
    //console.log('ionViewDidLoad VerPropiedadPage');



      this.folio = this.navParams.get('index');
      var promise = this.propiedadesProvider.cargarPropiedad(this.folio);
      promise.subscribe(data=>{
        this.datos = data.json().data;
        this.mapLat = this.datos.latitude;
        this.mapLong = this.datos.longitude;
        this.precios = this.datos.prices;
        this.operacion  = this.datos.operation;
        if(this.operacion.sold) this.operacion.sold = this.operacion.sold.toUpperCase();
        if(this.operacion.opportunity_sold) this.operacion.opportunity_sold = this.operacion.opportunity_sold.toUpperCase();
        if(this.operacion.rent) this.operacion.rent = this.operacion.rent.toUpperCase();
        if(this.operacion.vacation_rent) this.operacion.vacation_rent = this.operacion.vacation_rent.toUpperCase();
        this.agente = data.json().data.agent;
        this.slider = data.json().data.images;
        this.servicios = data.json().data;
        this.servicios = data.json().data.services;
        this.amenidades = data.json().data.amenities;
        //this.exteriores = data.json().data.exterior;
        this.aux2 = data.json().data.exterior;
        for (let key in this.aux2) {
          this.exteriores.push(this.aux2[key]);
        }
        this.aux = data.json().data.interiores;
        for (let key in this.aux) {
          this.interiores.push(this.aux[key]);
        }
        this.loadMap();
        this.URL = 'http://www.santarita.immosystem.com.mx/propiedad-' + this.datos.folio;
        var urlParam = this.datos.propertyNameEs.split(" ");
        /*urlParam.array.forEach(element => {
          this.URL += '-' + element;  
        });*/
        for(let data of urlParam){
          this.URL += '-' + data;  
        }


        this.storage.get('data').then(data=>{
          this.dataSession = data;
          if(data == null){
            this.agenteNombre = this.agente.fullname;
            this.agenteMail = this.agente.email;
          }else{
            this.agenteNombre = this.dataSession.fullname;
            this.agenteMail = this.dataSession.email;
          }
      })
      })


      
    

    //console.log(this.datos);
  }





  compartir(plataforma:any, folio:any){
    this.URL += folio
    this.plt.ready().then(()=>{
      if(this.plt.is('android')){
        if(plataforma == 'facebook'){
          this.socialSharing.shareViaFacebook(null, null, this.URL);
        }else if(plataforma == 'twitter'){
          this.socialSharing.shareViaTwitter(null, null, this.URL);
        }else if(plataforma == 'whatsapp'){
          this.socialSharing.shareViaWhatsApp(null, null, this.URL)
        }else if(plataforma == 'instagram'){
          this.socialSharing.shareViaInstagram(this.URL,this.slider[0].largefile);
        }else if(plataforma == 'pinterest'){
          this.socialSharing.shareVia('com.pinterest',null, null, null, this.URL);
        }else if(plataforma == 'googleplus'){
          this.socialSharing.shareVia('com.google.android.apps.plus', this.URL, null, null);
        }
      }else{
        if(plataforma == 'facebook'){
          this.socialSharing.shareViaFacebookWithPasteMessageHint('hola!', null, this.URL);
        }else if(plataforma == 'twitter'){
          this.socialSharing.shareViaTwitter('twitter a compartir');
        }else if(plataforma == 'whatsapp'){
          this.socialSharing.shareViaWhatsApp('mensaje')
          .then(()=>{
    
          }).catch(()=>{
    
          })
        }else if(plataforma == 'instagram'){
          this.socialSharing.shareViaInstagram('compartir','œremtur');
        }else if(plataforma == 'pinterest'){
          this.socialSharing.share('','');
        }else if(plataforma == 'googleplus'){
          this.socialSharing.shareWithOptions({
            message: 'titulo'
          })
        }
      }
    })
  }

  llamar(num:any){
    this.callNumber.callNumber(num, true)
    .then(res => console.log('llamando', res))
    .catch(err => console.log('error de llamada', err));
  }

  mensajear(){
    let modal = document.getElementById("modal");

    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }




    /*this.emailComposer.isAvailable().then((available: boolean) => {
      if(available){
        console.log('disponible');
      }
    });

    let email = {
      to: 'crhis.vazquez@gmail.com',
      cc: 'jorgesdfgfdg@gmail.com',
      bcc: ['john@doe.com', 'jane@doe.com'],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    this.emailComposer.open(email);*/
  }

  
  enviarCorreo(){
    if(this.fMail.value.nombre == ""){
      this.errorM = true;
    }

    if(this.fMail.value.telefono == ""){
      this.errorM = true;
    }

    if(this.fMail.value.correo == ""){
      this.errorM = true;
    }

    if(this.fMail.value.comentario == ""){
      this.errorM = true;
    }

    if(this.fMail.value.apellido == ""){
      this.errorM = true;
    }

    if(!this.errorM){
      this.comentarios = {
        'contacto':             25,
        'nombre':               this.fMail.value.nombre,
        'ap_paterno':           this.fMail.value.apellido,
        'cel':                  this.fMail.value.telefono,
        'email':                this.fMail.value.correo,
        'comentarios':          this.fMail.value.comentario,
        'creatorid':            1994,
        'user':                 1994,
        'companyid':            this.usuarioProvider.companyid,
        'online':               1,
        'sendMailApp':          true
      }

      this.comentariosMail = {
        'property':           this.datos.folio,
        'name':               this.fMail.value.nombre,
        'email':              this.fMail.value.correo,
        'phone':              this.fMail.value.telefono,
        'message':            this.fMail.value.comentario
      }

      var promise = this.usuarioProvider.agregarPreregistro(this.comentarios);
      promise.subscribe(data=>{
        if(data.status == 200){
          var promiseMail = this.usuarioProvider.enviarPropiedadMail(this.comentariosMail);
          promiseMail.subscribe(data=>{
          });
          let alert = this.alertCtrl.create({
            title: 'Exitoso',
            message: 'El envio del correo fue exitoso',
            buttons: [
              {
                text: 'ok',
                role: 'cancel'
              }
            ]
          });
          alert.present();
          /*var promise2 = this.usuarioProvider.guardarMailDB(this.datosMailDB);
          promise2.subscribe(data=>{
            console.log(data);
          })*/
        }else{
          let alert = this.alertCtrl.create({
            title: 'problema',
            message: 'Hubo un problema en el envio del correo',
            buttons: [
              {
                text: 'ok',
                role: 'cancel'
              }
            ]
          });
          alert.present();
        }
      })


    }


  }

  cerrarModal(){
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    modal = document.getElementById("modalImagen");
    modal.style.display = "none";
  }


  loadMap() {
    
    if( this.datos.latitude == '0' && this.datos.longitude == '0'){
      this.mapView = false;
    }else{
  
      this.mapView = true;
  
      this.mapstyle = [{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }];
      let LatLng = new google.maps.LatLng( this.datos.latitude,this.datos.longitude );
  
      this.mapProp = {
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        setMyLocationEnabled: false,
        setCompassEnabled: true,
        styles: this.mapstyle,
        zoom: 14,
        center: LatLng
      };
      var mapEle: HTMLElement = document.getElementById('mapa');
      this.map = new google.maps.Map(mapEle, this.mapProp);
      new google.maps.Marker({ position: LatLng, map: this.map, title: '' });  
    }
  
  }

  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 80;
    this.ref.detectChanges();
  }

  sharingwhats(){
    this.socialSharing.shareViaWhatsAppToReceiver('4921730905', 'hola, ', '','');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(GeneralFormPage, {'id':'pop'} , { cssClass: 'content-popover' });
    popover.present();
    popover.onDidDismiss(data => {
      if(data.data != null && data.name){

        var loader = this.loadingCtrl.create({
          dismissOnPageChange: false
        });
        loader.present();
        var promise = this.propiedadesProvider.compartirPropiedad(this.datos.folio, this.idUsuario, '', data.name, data.data);
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

    });
  }




}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormulariosProvider } from '../../providers/formularios/formularios';
import { Storage } from '@ionic/storage';
import { ContactosProvider } from '../../providers/contactos/contactos';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-agregar-contacto',
  templateUrl: 'agregar-contacto.html',
})

export class AgregarContactoPage {
  public generalForm     : FormGroup;
  public contactForm    : FormGroup;
  public fDelContacto : FormGroup;
  public fAgente      : FormGroup;
  public fBusca       : FormGroup;
  public fInmueble    : FormGroup;
  look                : Boolean = false;
  flag                : Boolean = false;
  formulario          : any = {};
  error               : Boolean = false;
  cliente_busca       : any = [];
  mediosDeContacto    : any = [];
  subMediosDeContactos: any = [];
  listaDeOficinas     : any = [];
  agentesDeOficina    : any = [];
  listaDeLenguajes    : any = [];
  listaDeCiudades     : any = [];
  listaDePaises       : any = [];
  listaDeEstados      : any = [];
  medioValor          : any;
  datosFG             :any  = {};
  datosMC             :any  = {};
  datosCB             :any  = {};
  datosAgregar        :any  = {};
  idUsuario           :any;
  media_extra         :any;
  generalData      :any  = [];
  aux                 :any  = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public formularioProvider: FormulariosProvider,
    private storage: Storage,
    public usuarioProvider:UsuarioProvider,
    public contactoProvider: ContactosProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    this.storage.get('dataUser').then(data=>{
      console.log(data);
      //this.generalData.user = data;
      //this.generalData.creatorid = data;
    });
    //Formulario datos generales
    this.generalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastNameF: ['', [Validators.required]],
      lastNameM: [''],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      cellphone: [''],
      telephone: ['']
    });
    //Formulario Medio de Contacto
    this.contactForm = this.formBuilder.group({
      contactMedia: ['', Validators.required],
      contactDetail: [''],
      comments: ['', Validators.required]
    });
    //
    this.fAgente = this.formBuilder.group({
      officinaA: ['', Validators.required],
      asesorA: ['', Validators.required]
    });
    //Datos de Opcion: Referencias y Otro
    this.generalData.referid = '';
    this.generalData.emailRef = '';
    this.generalData.telefonoRef = '';
    this.generalData.agenciaRef = '';

    //this.generalData.cel = '';
    //this.generalData.ap_materno = '';
    this.generalData.subcontacto = '';
    this.generalData.online = 1;
    this.generalData.office = '';
    this.generalData.user = '';
    this.generalData.companyid = this.usuarioProvider.companyid;

  }
  //----------------------------------------------------------------------------
  //Obtiene antes de entrar a la página
  ionViewCanEnter() {
    var offices = this.formularioProvider.listaDeOficinas(this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
      offices.subscribe(data=>{
        this.listaDeOficinas = data.json().data.userOffice;
     });
     //
    var cities = this.formularioProvider.listaDeCiudad(this.usuarioProvider.datos.companyid);
      cities.subscribe(data => {
        this.listaDeCiudades = data.json().data;
      });
    //
    var contacts = this.formularioProvider.mediosDeContactos();
      contacts.subscribe(data =>{
        this.mediosDeContacto = data.json().data;
    });
    //
    var languages = this.formularioProvider.listaDeLenguajes();
    languages.subscribe(data => {
      this.listaDeLenguajes = data.json().data;
    });
    //
    var countries = this.formularioProvider.listaDePaises();
    countries.subscribe(data => {
      this.listaDePaises = data.json().data;
    });
  }
  //----------------------------------------------------------------------------
  //Valida la sección "Datos Generales"
  generalDataForm(){
    this.error = true;
      if(this.generalForm.get('email').hasError('required')){
        this.flag = false;
    }else{
      this.flag = true;
    }

    if(!this.generalForm.get('name').hasError('required') && !this.generalForm.get('lastNameF').hasError('required') && this.generalForm.get('email').valid){
      var contactoH = document.getElementById('contacto');
      var generalesH = document.getElementById('generales');
        contactoH.style.display = "block";
        generalesH.style.display = "none";
        this.error = false;
    }else{}
  }
  //----------------------------------------------------------------------------
  //Formulario Medios de contacto
  contactDataForm(){
    this.error = true;

    if((this.contactForm.value.contactMedia == 3 || this.contactForm.value.contactMedia == 7)){
      if(!this.contactForm.get('Nbroker').hasError('required') && !this.contactForm.get('Ebroker').hasError('email') && !this.contactForm.get('comments').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }
    }else if((this.contactForm.value.contactMedia == 6)){
      if(!this.contactForm.get('otro').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }
    }else{
      if(!this.contactForm.get('contactMedia').hasError('required') && !this.contactForm.get('contactMedia').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }
    }
  }
  //----------------------------------------------------------------------------
  //Actualiza el Select de Opciones de medio de contacto
  detailUpdate(){
    var subContactos = this.formularioProvider.subMediosDeContactos(this.contactForm.value.contactMedia);
      subContactos.subscribe(data=>{
      this.subMediosDeContactos = data.json().data;
      });
    }
  //----------------------------------------------------------------------------
  //Cambia la lista de detalles dependiendo del Medio de Contacto y Elimina FormControls innecesarios
  detailValidation(){
    this.media_extra = this.contactForm.value.contactMedia
    if(this.media_extra == 3 || this.media_extra == 7){
      this.contactForm.addControl('Nbroker', new FormControl('', Validators.required));
      this.contactForm.addControl('Ebroker', new FormControl('',Validators.email));
      this.contactForm.addControl('Tbroker', new FormControl(''));
      this.contactForm.addControl('Abroker', new FormControl(''));
    }else if(this.media_extra == 6){
        this.generalData.referid = '';
        this.generalData.emailRef = '';
        this.generalData.telefonoRef = '';
        this.generalData.agenciaRef = '';
        this.contactForm.removeControl('Nbroker');
        this.contactForm.removeControl('Ebroker');
        this.contactForm.removeControl('Tbroker');
        this.contactForm.removeControl('Abroker');
        this.contactForm.addControl('otro', new FormControl('', Validators.required));
    }else{
      this.generalData.referid = '';
      this.generalData.emailRef = '';
      this.generalData.telefonoRef = '';
      this.generalData.agenciaRef = '';
      this.contactForm.removeControl('Nbroker');
      this.contactForm.removeControl('Ebroker');
      this.contactForm.removeControl('Tbroker');
      this.contactForm.removeControl('Abroker');
      this.contactForm.removeControl('otro');
    }
  }
  //----------------------------------------------------------------------------
  //Formulario de que busca el usuario
  lookingForForm(){
    var size = Object.keys(this.aux).length;
    if(size > 0){
      if(this.aux.busca_c || this.aux.busca_r){
        var clienteB = document.getElementById('busca');
        var compradores = document.getElementById('enlista');
        clienteB.style.display = "none";
        compradores.style.display = "block";
      }else{
        this.look = true;
      }
    }else{
      this.look = true;
    }
  }
  //----------------------------------------------------------------------------
  //Regresa a formularios anteriores
  goBack(index:any){

    switch(index){
      case "general": {
        break;
      }
      case "contact": {
        var contactoH = document.getElementById('contacto');
        var generalesH = document.getElementById('generales');
        contactoH.style.display = "none";
        generalesH.style.display = "block";
        break;
      }
      case "busca": {
        var clienteB = document.getElementById('busca');
        var contacto = document.getElementById('contacto');
        clienteB.style.display = "none";
        contacto.style.display = "block";
        break;
      }
      case "compradores": {
        var compradores = document.getElementById('compradores');
        var busca = document.getElementById('busca');
        compradores.style.display = "none";
        busca.style.display = "block";
        break;
      }
      case "financiera": {
        var financiera = document.getElementById('financiera');
        var compradores = document.getElementById('compradores');
        financiera.style.display = "none";
        compradores.style.display = "block";
        break;
      }
      case "inmueble": {
        var inmueble = document.getElementById('inmueble');
        var financiera = document.getElementById('financiera');
        inmueble.style.display = "none";
        financiera.style.display = "block";
        break;
      }
      case "enlista": {
        var enlista = document.getElementById('enlista');
        var inmueble = document.getElementById('busca');
        enlista.style.display = "none";
        inmueble.style.display = "block";
        break;
      }
    }

  }
  //----------------------------------------------------------------------------

agregarContacto(){
  if(this.aux.busca_c && this.generalData.busca_r){
    this.generalData.lookfor = 'CR';
  } else if(this.aux.busca_c){
    this.generalData.lookfor = 'C';
  }else if(this.aux.busca_r){
    this.generalData.lookfor = 'R';
  }

  if(this.aux.listar_v && this.aux.listar_r){
    this.generalData.lookfor1 = 'VR';
  }else if(this.aux.listar_v){
    this.generalData.lookfor1 = 'V';
  }else if(this.aux.listar_r){
    this.generalData.lookfor1 = 'R';
  }

  if(this.generalData.office != '' && this.generalData.user != ''){

    var UrlData = '';
    var datos = this.generalData;
    Object.keys(datos).forEach(function(key){
      UrlData += '&' + key + '=' + datos[key];
    })
    console.log(this.generalData);
    var loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });


    /*var agregarContacto = this.usuarioProvider.agregarPreregistro(this.generalData);
    agregarContacto.subscribe(data => {
      if(data.status == 200){
        loader.dismiss();
        const alerta = this.alertCtrl.create({
          title: 'EXITO',
          subTitle: 'El contacto ha sido agregado con éxito',
          buttons: ['ok']
        });
        alerta.present();
        this.navCtrl.pop();
      }
    })
    */
  }else{

    const alerta = this.alertCtrl.create({
      title: '',
      subTitle: 'El campo Oficina y Asesor son obligatorios',
      buttons: ['ok']
    });
    alerta.present();

  }



}



actualizarAsesor(){

  var agentesO = this.formularioProvider.listaDeAgentes(this.fAgente.value.officinaA);
  agentesO.subscribe(data=>{
    this.agentesDeOficina = data.json().data;
  });

}


}

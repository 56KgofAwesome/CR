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
  public generalForm  : FormGroup;
  public contactForm  : FormGroup;
  public agentForm    : FormGroup;
  public fBusca       : FormGroup;
  public fInmueble    : FormGroup;
  look                : Boolean = false;
  flag                : Boolean = false;
  formulario          : any = {};
  error               : Boolean = false;
  cliente_busca       : any = [];
  mediosDeContacto    : any = [];
  subMediosDeContactos: any = [];
  officesList         : any = [];
  officeAgents        : any = [];
  listaDeLenguajes    : any = [];
  listaDeCiudades     : any = [];
  listaDePaises       : any = [];
  listaDeEstados      : any = [];
  medioValor          : any;
  datosAgregar        : any  = {};
  idUsuario           : any;
  media_extra         : any;
  generalData         : any  = [];
  aux                 : any  = [];
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
    });
    //Formulario datos generales
    this.generalForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      ap_paterno: ['', [Validators.required]],
      ap_materno: [''],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      cel: [''],
      tel: ['']
    });
    //Formulario Medio de Contacto
    this.contactForm = this.formBuilder.group({
      contacto: ['', Validators.required],
      subcontacto: [''],
      comentarios: ['', Validators.required]
    });
    //Formulario Agente
    this.agentForm = this.formBuilder.group({
      office: ['', Validators.required],
      user: ['', Validators.required]
    });
    //Datos de Opcion: Referencias y Otro
    /*this.generalData.rephId = '';
    this.generalData.rephEmail = '';
    this.generalData.rephTel = '';
    this.generalData.rephAgency = '';*/
    //
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
        this.officesList = data.json().data.userOffice;
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

    if(!this.generalForm.get('nombre').hasError('required') && !this.generalForm.get('ap_paterno').hasError('required') && this.generalForm.get('email').valid){
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

    if((this.contactForm.value.contacto == 3 || this.contactForm.value.contacto == 7)){
      if(!this.contactForm.get('referid').hasError('required') && !this.contactForm.get('referral_mail').hasError('email') && !this.contactForm.get('comentarios').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }
    }else if((this.contactForm.value.contacto == 6)){
      if(!this.contactForm.get('otro_camp').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }
    }else{
      if(!this.contactForm.get('contacto').hasError('required') && !this.contactForm.get('contacto').hasError('required') && !this.contactForm.get('comentarios').hasError('required')){
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
    var subContacts = this.formularioProvider.subMediosDeContactos(this.contactForm.value.contacto);
      subContacts.subscribe(data=>{
      this.subMediosDeContactos = data.json().data;
      });
    }
  //----------------------------------------------------------------------------
  //Cambia la lista de detalles dependiendo del Medio de Contacto y Elimina FormControls innecesarios
  detailValidation(){
    this.media_extra = this.contactForm.value.contacto;
    if(this.media_extra == 3 || this.media_extra == 7){
      this.generalData.otro_camp = '';
      this.contactForm.addControl('referid', new FormControl('', Validators.required));
      this.contactForm.addControl('referral_mail', new FormControl('',Validators.email));
      this.contactForm.addControl('referral_phone', new FormControl(''));
      this.contactForm.addControl('referral_agency', new FormControl(''));
    }else if(this.media_extra == 6){
        this.generalData.referid = '';
        this.generalData.referral_email = '';
        this.generalData.referral_phone = '';
        this.generalData.referral_agency = '';
        this.contactForm.removeControl('referid');
        this.contactForm.removeControl('referral_mail');
        this.contactForm.removeControl('referral_phone');
        this.contactForm.removeControl('referral_agency');
        this.contactForm.addControl('otro_camp', new FormControl('', Validators.required));
    }else{
      this.generalData.otro_camp = '';
      this.generalData.referid = '';
      this.generalData.referral_mail = '';
      this.generalData.referral_phone = '';
      this.generalData.referral_agency = '';
      this.contactForm.removeControl('referid');
      this.contactForm.removeControl('referral_mail');
      this.contactForm.removeControl('referral_phone');
      this.contactForm.removeControl('referral_agency');
      this.contactForm.removeControl('otro_camp');
    }
  }
  //----------------------------------------------------------------------------
  //Formulario de que busca el usuario
  lookingForForm(){
    var size = Object.keys(this.aux).length;
    if(size > 0){
      if(this.aux.lookToBuy || this.aux.lookToRent){
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
  //Recopilar los datos del formulario y agregarlo
  addContact(){
    if(this.aux.lookToBuy && this.generalData.lookToRent){
      this.generalData.lookfor = 'CR';
    }else if(this.aux.lookToBuy){
      this.generalData.lookfor = 'C';
    }else if(this.aux.lookToRent){
      this.generalData.lookfor = 'R';
    }

    if(this.aux.listSales && this.aux.listRents){
      this.generalData.lookfor1 = 'VR';
    }else if(this.aux.listSales){
      this.generalData.lookfor1 = 'V';
    }else if(this.aux.listRents){
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
      var agregarContacto = this.usuarioProvider.agregarPreregistro(this.generalData);
      agregarContacto.subscribe(data => {
        if(data.status == 200){
          loader.dismiss();
          this.successAlert();
          this.navCtrl.pop();
        }
      })

    }else{
      this.warningAlert();
    }
  }
  //----------------------------------------------------------------------------
  //Actualiza la lista de agentes de la oficina seleccionada
  updateAgents(){
    var officeAgents = this.formularioProvider.listaDeAgentes(this.agentForm.value.office,this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
    officeAgents.subscribe(data=>{
      this.officeAgents = data.json().data;
    });
  }
  //------------------------------------------------------------------------------
  //Alerta de registro exitoso
  successAlert(){
    const alerta = this.alertCtrl.create({
      title: 'ÉXITO',
      subTitle: 'El contacto ha sido agregado con éxito',
      buttons: ['ok']
    });
    alerta.present();
  }
  //------------------------------------------------------------------------------
  //Alerta de 'Asesor' u 'Oficina' no seleccionados
  warningAlert(){
    const alerta = this.alertCtrl.create({
      title: '',
      subTitle: 'El campo Oficina y Asesor son obligatorios',
      buttons: ['ok']
    });
    alerta.present();
  }
}

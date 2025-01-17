import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormulariosProvider } from '../../providers/formularios/formularios';
import { Storage } from '@ionic/storage';
import { ContactosProvider } from '../../providers/contactos/contactos';
import { AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ElementEnablerProvider } from  '../../providers/element-enabler/element-enabler';


@IonicPage()
@Component({
  selector: 'page-agregar-compradores',
  templateUrl: 'agregar-compradores.html',
})
export class AgregarCompradoresPage {
  public fGeneral     : FormGroup;
  public fContacto    : FormGroup;
  public fDelContacto : FormGroup;
  public agentForm    : FormGroup;
  public fBusca       : FormGroup;
  public fInmueble    : FormGroup;
  flag                : Boolean = false;
  flagMail2           : Boolean = false;
  formulario          : any = {};
  error               : Boolean = false;
  errorMail2          : Boolean = false;
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
  datosFG             : any  = {};
  datosMC             : any  = {};
  datosCB             : any  = {};
  datosAgregar        : any  = {};
  idUsuario           : any;
  media_extra         : any;
  datosGenerales      : any  = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public formularioProvider: FormulariosProvider,private storage: Storage,
              public enabler: ElementEnablerProvider, public contactoProvider: ContactosProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public usuarioProvider:UsuarioProvider
  ){
  //Datos Generales
    this.fGeneral = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidoP: ['', [Validators.required]],
      apellidoM: [''],
      email1: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      email2: ['', [Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      rfc: [''],
      nac: [''],
    });
//9984069591
    this.fContacto = this.formBuilder.group({
      medioC: ['', Validators.required],
      detalle: [''],
      comentarios: ['', Validators.required]
    });



    this.agentForm = this.formBuilder.group({
      office: ['', Validators.required],
      agent: ['', Validators.required]
    });

    this.fDelContacto = this.formBuilder.group({
      fdcDir1: [''],
      fdcDir2: [''],
      fdcPostal: [''],
      fdcPais: [''],
      fdcCiudad: [''],
      fdcNacionalidad: [''],
      fdcIdioma: [''],
      fdcTelC: [''],
      fdcTelO: [''],
      fdcFax: [''],
      fdcCelL: [''],
      fdcNextel: [''],
      fdcNoFam: [''],
      fdcProf: [''],
      fdcCivil: [''],
      fdcEmpresa: [''],
      fdcWeb: [''],
      fdcComentarios: ['']
    });

    this.datosGenerales.user = this.usuarioProvider.datos.id;
    this.datosGenerales.ap_materno    = '';
    this.datosGenerales.agent         = '';
    this.datosGenerales.ap_paterno    = '';
    this.datosGenerales.busca_c       = false;
    this.datosGenerales.busca_r       = false;
    this.datosGenerales.listar_v      = false;
    this.datosGenerales.listar_r      = false;
    this.datosGenerales.exclusiva     = false;
    this.datosGenerales.cel_tel       = '';
    this.datosGenerales.ciudad        = '';
    this.datosGenerales.codigo_p      = '';
    this.datosGenerales.comentarios   = '';
    this.datosGenerales.contacto      = '';
    this.datosGenerales.country       = '';
    this.datosGenerales.direccion     = '';
    this.datosGenerales.direccion2    = '';
    this.datosGenerales.email         = '';
    this.datosGenerales.email2        = '';
    this.datosGenerales.empresa       = '';
    this.datosGenerales.fax_tel       = '';
    this.datosGenerales.idioma        = '';
    this.datosGenerales.ingreso_anual = '';
    this.datosGenerales.nacimiento    = '';
    this.datosGenerales.nacionalidad  = '';
    this.datosGenerales.nextel_tel    = '';
    this.datosGenerales.nombre        = '';
    this.datosGenerales.num_familia   = '';
    this.datosGenerales.num_visitas   = '';
    this.datosGenerales.office        = '';
    this.datosGenerales.oficina_tel   = '';
    this.datosGenerales.profecion     = '';
    this.datosGenerales.rfc           = '';
    this.datosGenerales.sitio_web     = '';
    this.datosGenerales.subcontacto   = '';
    this.datosGenerales.tel           = '';
    this.datosGenerales.companyid     = this.usuarioProvider.companyid;
    this.datosGenerales.online        = 1;

  }
  //Carga antes de entrar a la página
  ionViewCanEnter(){
    //Obtener lista de oficinas
    var offices = this.formularioProvider.listaDeOficinas(this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
      offices.subscribe(data=>{
        this.officesList = data.json().data.userOffice;
     });
     //-------------------------------------------------------------------------
    //Obtener lista de Ciudades
    this.storage.get('folio').then(data => {
      var ciudad = this.formularioProvider.listaDeCiudad(data);
      ciudad.subscribe(data => {
        this.listaDeCiudades = data.json().data;
      });
    });
    //-------------------------------------------------------------------------
    //Obtener medios de Contacto
    var contactos = this.formularioProvider.mediosDeContactos();
    contactos.subscribe(data =>{
      this.mediosDeContacto = data.json().data;
    });
    //-------------------------------------------------------------------------
    //Obtiene los submedios de contacto
    var subContactos = this.formularioProvider.subMediosDeContactos(this.medioValor);
    subContactos.subscribe(data=> {
      this.subMediosDeContactos = data.json().data;
    });
    //-------------------------------------------------------------------------
    //Obtiene los idiomas
    var lenguajes = this.formularioProvider.listaDeLenguajes();
    lenguajes.subscribe(data => {
      this.listaDeLenguajes = data.json().data;
    });
    //-------------------------------------------------------------------------
    //Obtiene lista de Países
    var paises = this.formularioProvider.listaDePaises();
    paises.subscribe(data => {
      this.listaDePaises = data.json().data;
    });
    //-------------------------------------------------------------------------
    //Obtiene lista de ciudades
    var ciudades = this.formularioProvider.listaDeCiudad(150);
    ciudades.subscribe(data => {
      this.listaDeCiudades = data.json().data;
      console.log(this.listaDeCiudades)
    });
  }
  //----------------------------------------------------------------------------
  //Formulario de datos generales
  formularioGeneral(){
    this.error = true;
    if(/*this.enabler.addBuyer.nombre.required && */this.fGeneral.get('email1').hasError('required')){
      this.flag = false;
    }else{
      this.flag = true;
    }

    if(!this.fGeneral.get('nombre').hasError('required') && !this.fGeneral.get('apellidoP').hasError('required') && !this.fGeneral.get('email1').hasError('required') && !this.fGeneral.get('email1').hasError('email') && this.fGeneral.get('email1').valid){
      this.errorMail2 = true;
      if(this.fGeneral.value.email2 != ''){
        this.flagMail2 = true;
      }else{
        this.flagMail2 = false;
      }

      var contactoH = document.getElementById('contacto');
      var generalesH = document.getElementById('generales');
      contactoH.style.display = "block";
      generalesH.style.display = "none";
      this.error = false;
    }
    console.log(this.datosGenerales);
  }
  //----------------------------------------------------------------------------
  //Formulario datos de contacto
  formularioContacto(){
    this.error = true;

    if(this.fContacto.value.medioC == 3 || this.fContacto.value.medioC == 7){
      if(!this.fContacto.get('Nbroker').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }
    }else if(this.fContacto.value.medioC == 6){
      if(!this.fContacto.get('otro').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }
    }else{
      if(!this.fContacto.get('medioC').hasError('required') && !this.fContacto.get('medioC').hasError('required')){
        var contactoH = document.getElementById('contacto');
        var clienteB = document.getElementById('busca');
        contactoH.style.display = "none";
        clienteB.style.display = "block";
        this.error = false;
      }

    }
      console.log(this.datosGenerales);

  }
  //----------------------------------------------------------------------------
  //Formularios de Preferencias de Búsqueda
  formularioBusca(){


    if(this.datosGenerales.busca_c || this.datosGenerales.busca_r){
      var clienteB = document.getElementById('busca');
      var compradores = document.getElementById('compradores');
      clienteB.style.display = "none";
      compradores.style.display = "block";
    }else{
      var elemento = document.getElementById('operacionMensaje').innerHTML = '<div><p style="color: red;">este campo es obligatorio</p></div>';
    }
      console.log(this.datosGenerales);
  }
  //----------------------------------------------------------------------------
  //Formulario de preferencias de Compra
  formularioCompradores(){

    if(!this.fDelContacto.get('fdcNacionalidad').hasError('required')){
      var contactoH = document.getElementById('compradores');
      var financiera = document.getElementById('financiera');
      contactoH.style.display = "none";
      financiera.style.display = "block";
    }
      console.log(this.datosGenerales);
  }
  //----------------------------------------------------------------------------
  //Formulario de información financiera
  formularioFinanciera(){

    var financiera = document.getElementById('financiera');
    var inmueble = document.getElementById('inmueble');
    financiera.style.display = "none";
    inmueble.style.display = "block";
    console.log(this.datosGenerales);
  }
  //----------------------------------------------------------------------------
  //Formulario de preferencias de inmueble
  formularioInmueble(){

    var inmueble = document.getElementById('inmueble');
    var enlista = document.getElementById('enlista');
    inmueble.style.display = "none";
    enlista.style.display = "block";
    console.log(this.datosGenerales);
  }
  //----------------------------------------------------------------------------
  //Actualiza la lista de agentes de la oficina seleccionada
  updateAgents(){
    var officeAgents = this.formularioProvider.listaDeAgentes(this.agentForm.value.office,this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
    officeAgents.subscribe(data=>{
      this.officeAgents = data.json().data;
      console.log(this.officeAgents);

    });
  }
  //----------------------------------------------------------------------------
  validarDetalle(){

    this.media_extra = this.fContacto.value.medioC
    if(this.fContacto.value.medioC == 3 || this.fContacto.value.medioC == 7){
      this.fContacto.addControl('Nbroker', new FormControl('', Validators.required));
      this.fContacto.addControl('Ebroker', new FormControl(''));
      this.fContacto.addControl('Tbroker', new FormControl(''));
      this.fContacto.addControl('Abroker', new FormControl(''));
    }else if(this.fContacto.value.medioC == 6){
      this.fContacto.addControl('otro', new FormControl('', Validators.required));
    }

  }


  agregarContacto(){


    if(this.datosGenerales.busca_c && this.datosGenerales.busca_r){
      this.datosGenerales.lookfor = 'CR';
    } else if(this.datosGenerales.busca_c){
      this.datosGenerales.lookfor = 'C';
    }else if(this.datosGenerales.busca_r){
      this.datosGenerales.lookfor = 'R';
    }

    if(this.datosGenerales.listar_v && this.datosGenerales.listar_r){
      this.datosGenerales.lookfor1 = 'VR';
    }else if(this.datosGenerales.listar_v){
      this.datosGenerales.lookfor1 = 'V';
    }else if(this.datosGenerales.listar_r){
      this.datosGenerales.lookfor1 = 'R';
    }

    if(this.datosGenerales.office != '' && this.datosGenerales.agent != ''){
      this.storage.get('dataUser').then(data=>{
        var test = data;
        console.log(data);
        console.log(test);
      });
      this.datosGenerales.user = this.usuarioProvider.datos.id;
      //console.log(this.datosGenerales.user);

      var UrlData = '';
      var datos = this.datosGenerales;
      Object.keys(datos).forEach(function(key){
        UrlData += '&' + key + '=' + datos[key];
      })
console.log(datos);
      var loader = this.loadingCtrl.create({
        dismissOnPageChange: false
      });
      console.log(datos);
  loader.present();
      var agregarContacto = this.contactoProvider.agergarContactosComp(UrlData,this.usuarioProvider.datos.userToken);
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



    }else{
      const alerta = this.alertCtrl.create({
        title: '',
        subTitle: 'El campo Oficina y Asesor son obligatorios',
        buttons: ['ok']
      });
      alerta.present();
    }


  }

  actualizarDetalle(){

    var subContactos = this.formularioProvider.subMediosDeContactos(this.fContacto.value.medioC);
    subContactos.subscribe(data=>{
      this.subMediosDeContactos = data.json().data;
    });

  }


  actualizarCiudades(){
    var ciudades = this.formularioProvider.listaDeCiudad(150);
    ciudades.subscribe(data => {
      this.listaDeCiudades = data.json().data;
    });

  }

  actualizarEstado(){
    var estado = this.formularioProvider.listaDeEstados(this.datosGenerales.country);
    estado.subscribe(data => {
      this.listaDeEstados = data.json().data;
    })
  }


  regresar(index:any){

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
        var inmueble = document.getElementById('inmueble');
        enlista.style.display = "none";
        inmueble.style.display = "block";
        break;
      }
    }

  }






}

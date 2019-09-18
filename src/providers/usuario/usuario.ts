import { ApiProvider } from '../api/api';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Header } from '../../../node_modules/ionic-angular/umd';
import { companyid } from '../../interfaces/datosContacto';
import { AlertController, Events,LoadingController } from 'ionic-angular';


// http://www.immosystem.com.mx/appImmov2/immoApp2.php?d=0&m=[eliminaresto]contact&folio=139&propertyid=16690&fullname=jair&email=asdasd@asdasda.com.mx&phone=998155881238&message=testeando&location=Av.%20Xpujil%20Sur%2039,%2015,%2077505%20Canc%C3%BAn,%20Q.R.,%20M%C3%A9xico&contacttype=1&latitude=21.1452964&longitude=-86.82968079999999&soldagentid=0

@Injectable()
export class UsuarioProvider {
  url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
  //body:any = 'mdvp=true&mode=user&f=G&email=jorge@immosystem.com.mx&password=Sysadmin32';
  companyid = 4;
  companyurl = 'http://crrivieramaya.com';
  companycontact;
  companyUser = 1671;
  companyOffice = 227;
  datos       : any = [];

  constructor(public http : Http, public apiProvider: ApiProvider,public alertCtrl: AlertController,private storage: Storage,public events: Events,public loadingCtrl: LoadingController) {
  }
  //------------------------------------------------------------------------------------------------------------
  //Login del usuario
  login(username:any, password:any) {
    const loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();
    var body = 'm=login'+'&email='+username+'&password='+password;
    this.apiProvider.post(body)
      .subscribe(data=>{
          var answerLogin = data.json().status;
          var dataLogin =  data.json().data;
          loader.dismiss();
          if(data.status == 200){
            if(answerLogin == 501){
              this.incorrectAlert();
            }else if((answerLogin == 200 && dataLogin.companyid == this.companyid) || dataLogin.companyid ==27){
              this.storage.set('userToken', dataLogin.token)
              console.log(dataLogin.token);
              /*this.storage.set('usuario', data.json().data.userid);
              this.storage.set('data',data.json().data.info);
              this.storage.set('folio', data.json().data.companyid);
              this.datos.userid = data.json().data.userid;
              this.datos.officeid = data.json().data.officeid;
              this.datos.companyid = data.json().data.companyid;
              this.storage.set('assign', this.datos);*/
              //this.storage.set('usuario', data.json().data.userid);
              //this.storage.set('data',data.json().data);
              this.events.publish('user:created', data.json().data.info, Date.now());
            }
          }else{
            this.incorrectAlert();
          }
        })
    }
  //-------------------------------------------------------------------------------------------------------------
  //Método para cargar los destinos
  cargarDestino(){
    var body = 'm=developments&folio='+ companyid +'&states=1';
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para cargar la seccion de contactos
  cargarContacto(id:any){
    var body = 'm=visits&user='+id+'&token=';
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para cargar contactos referidos
  cargarContactoReferidos(id:any){
    var body = 'm=visitsPreregister&user='+id;
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Cargar lista de contactos potenciales
  cargarContactoPotencial(id:any){
    var body = 'm=potentialBuyers&folio='+ 4 +'&user='+id;
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para ver a un contacto en específico
  verContacto(id:any, idUsuario){
    var body = 'm=visit&user='+ idUsuario +'&visitid=' + id;
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para ver un contacto referido
  verContactoReferido(id:any, idUsuario){
    var body = 'm=visitPreregister&user='+ idUsuario + '&visitid='+ id;
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para agregar un preregistro
  agregarPreregistro(datos:any){
    var body    : string  = 'm=addBuyerPreregister';
        var datos = datos;
        Object.keys(datos).forEach(function(key){
          body += '&' + key + '=' + datos[key];
        })
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para enviar un mail
  enviarPropiedadMail(datos:any){
    var body = 'm=notifications&property='+ datos.property +'&name=' + datos.name + '&email=' + datos.email + '&phone=' + datos.phone + '&message=' + datos.message+'&agent=true';
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para enviar un mail de desarrollo
  enviarDesarrolloMail(datos:any){
    var body = 'm=notifications&development='+ datos.development +'&name=' + datos.name + '&email=' + datos.email + '&phone=' + datos.phone + '&message=' + datos.message+'&agent=true';
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para guardar mail en DB
  guardarMailDB(datos:any){
    var body =  'm=contact&fullname=' + datos.fullname + '&email=' + datos.email + '&phone=' + datos.phone + '&message=' + datos.message + '&contacttype=' + datos.contacttype + '&propertyid=' + datos.propertyid + '&folio=' + datos.folio + '&soldagentid=' + datos.soldagentid;
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para obtener tarea
  getTask(id){
    var body = 'm=task&user=' + id;
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para añadir tarea
  addTask(data){
    var body : string = data;
    return this.apiProvider.post(body);
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para leads
  getLeads(data){
    let body    :   string  =   'function=loadLocations' + data,
    header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options :   any     =   new RequestOptions({headers: header});
    //OTRO URL
    return this.http.post('http://www.immosystem.com.mx/appImmo/immoApp.php', body, options);
  }
//---------------------------------------------------------------------------------------------------------------
//Alerta de Datos incorrectos
  incorrectAlert(){
    let alert = this.alertCtrl.create({
      title: 'Datos incorrectos',
      message: 'Revisa bien los datos ingresados',
    });
    alert.present();
  }
}

import { ApiProvider } from '../api/api';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Header } from '../../../node_modules/ionic-angular/umd';
import { companyid } from '../../interfaces/datosContacto';
import { AlertController, Events,LoadingController } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {
  url:any = 'https://www.immosystem.com.mx/appImmov2/immoApp2.php';
  companyid = 227;
  companyurl = 'https://crrivieramaya.com';
  companycontact;
  companyUser = 1671;
  companyOffice = 227;
  datos: any = {};
  answer: any;

  constructor(public http : Http, public apiProvider: ApiProvider,public alertCtrl: AlertController,private storage: Storage,public events: Events,public loadingCtrl: LoadingController) {
  }
  //------------------------------------------------------------------------------------------------------------
  //Login del usuario
  login(username:any, password:any) {
    const loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();
    return new Promise((resolve)=>{
      var body = 'm=login'+'&email='+username+'&password='+password;
      this.apiProvider.post(body)
        .subscribe(data=>{
            var answerLogin = data.json().status;
            var dataLogin =  data.json().data;
            loader.dismiss();
            if(data.status == 200){
              if(answerLogin == 501){
                resolve(false);
              }else if((answerLogin == 200 && dataLogin.companyid == this.companyid) || dataLogin.companyid ==227){
                this.storage.set('userToken', dataLogin.token);
                this.storage.set('dataUser',dataLogin);
                resolve(true);
              }
            }else{
              resolve(false);
            }
          })
        })
    }
  //-------------------------------------------------------------------------------------------------------------
  //Obtener los datos del usuario
  getUserData(){
    return new Promise((resolve)=>{
      this.storage.get('dataUser').then(data =>{
          this.datos = {
            'id': data['userid'],
            'nombre': data['fullname'],
            'imagen': data['image'],
            'logo': data['logo'],
            'compania': data['company'],
            'companyid': data['companyid'],
            'mail': data['email'],
            'telefono': data['cellphone'],
            'celular': data['phone'],
            'userToken': data['token']
          }
          console.log(data['token']);
      resolve(this.datos);
      })
    })
  }
  //-------------------------------------------------------------------------------------------------------------
  //Método para cargar los destinos
  cargarDestino(){
    var body = 'm=developments&folio='+ companyid +'&states=1';
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
    return this.http.post('https://www.immosystem.com.mx/appImmo/immoApp.php', body, options);
  }

}

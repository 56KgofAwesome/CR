import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Header } from '../../../node_modules/ionic-angular/umd';
import { ApiProvider } from '../../providers/api/api';


@Injectable()
export class ContactosProvider {
  url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
  constructor(
    public http : Http,
    public apiProvider: ApiProvider
  ){
  }
  //----------------------------------------------------------------------------
  //Método para cargar lista de contactos
  getContactsList(id:any,token: any){
    var body = 'm=visits&user='+id+'&token='+token;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Método para cargar contactos referidos
  getReferedContactsList(id:any,token:any){
    var body = 'm=visitsPreregister&user='+id+'&token='+token;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Cargar lista de contactos potenciales
  getPotencialContactsList(id:any,token:any){
    var body = 'm=potentialBuyers&folio='+ 4 +'&user='+id+'&token='+token;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Método para ver a un contacto en específico
  getContactInfo(id:any, idUsuario,token:any){
    var body = 'm=visit&user='+ idUsuario +'&visitid=' + id + '&token='+ token;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Método para ver un contacto referido
  getReferedContactInfo(id:any, idUsuario,token:any){
    var body = 'm=visitPreregister&user='+ idUsuario + '&visitid='+ id +'&token='+token;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Método para agregar contactos referidos
  //Modulo pendiente en la API
  agregarContactosRef(datos){
    let body    : string = 'm=addBuyerPreregistro' + datos,
    header  : any    =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options : any    =  new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }
  //----------------------------------------------------------------------------
  //Módulo para agregar un comprador
  agergarContactosComp(datos,token:any){
    var body    : string = 'm=addBuyer&f=A' + datos + '&token='+token;
    return this.apiProvider.post(body);
  }
  //
  agregarComentario(datos){

    let body: string  = 'mode=visit&f='+datos,
    type    : string  = "application/x-www-form-urlencoded; charset=UTF-8",
    headers : any     = new Headers({ 'Content-Type': type}),
    options : any     = new RequestOptions({ headers: headers }),
    url     : any     = 'http://www.immosystem.com.mx/appImmov2/immoApp.php';

    var urlEnvio = url + body;

    return this.http.post(url, body, options);

  }

  activarVisita(datos){
    let body    : string = 'm=activateReferred&jash=jas' + datos,
    header  : any    =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options : any    =  new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  convertirPotencial(datos){
    let body    : string = 'm=addBuyerPotential&jash=jas' + datos,
    header  : any    =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options : any    =  new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  controlFacturacion(datos){
    let body    : string = 'm=controlFacturation&jash=jas' + datos,
    header  : any    =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options : any    =  new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }


}

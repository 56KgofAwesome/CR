import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { UsuarioProvider } from '../usuario/usuario';


@Injectable()
export class ContactosProvider {
  url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
  constructor(
    public http : Http,
    public apiProvider: ApiProvider,
    public usuarioProvider: UsuarioProvider
  ){
  }
  //----------------------------------------------------------------------------
  //Agregar un contacto Pre-registro(Visitas)
  addPreRegister(datos:any){
    var body    : string  = 'm=addBuyerPreregister&token='+this.usuarioProvider.datos.userToken;
        var datos = datos;
        Object.keys(datos).forEach(function(key){
          if(datos[key] != ''){
            body += '&' + key + '=' + datos[key];
          }
        })
    return this.apiProvider.post(body);
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
  //Módulo para agregar un comprador
  agergarContactosComp(datos,token:any){
    var body    : string = 'm=addBuyer&f=A' + datos + '&token='+token;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Agregar comentarios de seguimiento
  //(arreglo de datos,tipo de cliente-comprador o referido-, token del usuario)
  addComment(datos,type:any,token: any){
    var UrlData = '';
    Object.keys(datos).forEach(function(key){
      UrlData += '&' + key + '=' + datos[key];
    })
    //Validación del tipo de usuario para su registro en el módulo correspondiente
    var m: string = (type == 'c') ? 'addComment' : 'addCommentRefered';
    let body: string  = 'm='+ m +'&token='+token + UrlData;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
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

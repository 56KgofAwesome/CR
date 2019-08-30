import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Header } from '../../../node_modules/ionic-angular/umd';

/*
  Generated class for the ContactosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactosProvider {
  url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
  constructor(public http : Http) {
  }


  agregarContactosRef(datos){
    let body    : string = 'm=addBuyerPreregistro' + datos,
    header  : any    =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options : any    =  new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  agergarContactosComp(datos){
    let body    : string = 'm=addBuyer&f=A' + datos,
    header  : any    =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options : any    =  new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

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

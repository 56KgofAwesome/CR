import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
@Injectable()
export class FormulariosProvider {
  url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
  constructor(
    public http: Http,
    public apiProvider: ApiProvider
    ){

    }
  //----------------------------------------------------------------------------
  //Lista de Medios de Contactos
  mediosDeContactos(){
    var body    :   string  =   'm=contactMedias';
    return this.apiProvider.post(body);
  }
  //---------------------------------------------------------------------------
  //Lista de submedios de contacto pertenecientes al medio de contacto principal
  subMediosDeContactos(contactMediaID:any){
    var body    :   string  =   'm=subContactMedias&media=' + contactMediaID;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Lista de Oficinas relacionadas al usuario
  listaDeOficinas(idUser:any,token:any){
    var body    :   string  =   'm=offices&user=' + idUser + '&token='+token;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  listaDeAgentes(officeId:any){
    let body    :   string  =   'm=agents&office=' + officeId,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }
  //----------------------------------------------------------------------------
  //Lista de lenguajes disponbibles
  listaDeLenguajes(){
    var body    :   string  =   'm=languages';
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  //Lista de países
  listaDePaises(){
    var body    :   string  =   'm=countries';
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  listaDeEstados(pais){
    let body    :   string  =   'm=states&country=' + pais,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
        console.log(this.url + '?d=0' +body);
    return this.http.post(this.url, body, options);
  }
  //----------------------------------------------------------------------------
  //Lista de ciudades
  listaDeCiudad(folio){
    var body    :   string  =   'm=cities&folio=' + folio;
    return this.apiProvider.post(body);
  }
  //----------------------------------------------------------------------------
  listaDePhases(company){
    let body    :   string  =   'm=phases' + company,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  listaDeOperaciones(){
    let body    :   string  =   'm=operation',
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  listaDeActividades(){
    let body    :   string  =   'm=activityType',
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }
}

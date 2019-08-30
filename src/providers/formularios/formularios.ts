import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FormulariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormulariosProvider {
  url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
  constructor(public http: Http) {
    console.log('Hello FormulariosProvider Provider');
  }

  mediosDeContactos(){
    let body    :   string  =   'm=contactMedias',
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});

    return this.http.post(this.url, body, options);
  }

  subMediosDeContactos(idMedia:any){
    let body    :   string  =   'm=subContactMedias&media=' + idMedia,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  listaDeOficinas(idUser:any){
    let body    :   string  =   'm=offices&user=' + idUser,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  listaDeAgentes(officeId:any){
    let body    :   string  =   'm=agents&office=' + officeId,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  listaDeLenguajes(){
    let body    :   string  =   'm=languages',
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  listaDePaises(){
    let body    :   string  =   'm=countries',
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

  listaDeEstados(pais){
    let body    :   string  =   'm=states&country=' + pais,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
        console.log(this.url + '?d=0' +body);
    return this.http.post(this.url, body, options);
  }

  listaDeCiudad(folio){
    let body    :   string  =   'm=cities&folio=' + folio,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    return this.http.post(this.url, body, options);
  }

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

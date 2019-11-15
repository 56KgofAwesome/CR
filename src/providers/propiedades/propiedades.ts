import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Injectable()
export class PropiedadesProvider {
  url:any = 'https://www.immosystem.com.mx/appImmov2/immoApp2.php';
  constructor(public http : Http, public usuarioProvider: UsuarioProvider) {
  }

  cargarPorCiudad(idCiudad:any){
    let body    :   string  =   'm=developments&folio='+ this.usuarioProvider.companyid +'&state=' + idCiudad + '&app=1',
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
        console.log(this.url+body);
        return this.http.post(this.url, body, options);
  }

  cargarPropiedad(folio:any){
    console.log("el folio es: ");
    console.log(folio);

    let body    :   string  =   'm=property&folio=' + folio,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    /*if(id != null){
      body += '&user=' + id;
      console.log('el usuario contioene informacion jiji: ' + id);
    }else{
      console.log('el usauario no contiene informacion es null jiji: ' + id);
    }*/
        return this.http.post(this.url, body, options);
  }

  cargarDesarrollo(folio:any){
    console.log("el folio es: ");
    console.log(folio);

    let body    :   string  =   'm=development&folio=' + folio,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
    /*if(id != null){
      body += '&user=' + id;
      console.log('el usuario contioene informacion jiji: ' + id);
    }else{
      console.log('el usauario no contiene informacion es null jiji: ' + id);
    }*/
        return this.http.post(this.url, body, options);
  }


// http://www.immosystem.com.mx/appImmov2/immoApp2.php?d=0&m=findProperty&folio=135&bedrooms=1&bathrooms=1&priceFrom=1&priceTo=1000000&m2From=1&m2To=371.540
  filtrarPropiedad(datos:any, metros:any, metroslot:any){
    let body    :   string  =   'm=findProperty&folio='+ this.usuarioProvider.companyid,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});

        console.log('el url es: ' + body);
        return this.http.post(this.url, body, options);
  }

  filtrarDesarrollo(datos:any){
    let body    :   string  =   'm=findDevelopment&folio='+ this.usuarioProvider.companyid,
    header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options :   any     =   new RequestOptions({headers: header});

    console.log(this.url + body);
    return this.http.post(this.url, body, options);
  }

  verInventario(dev:any,status:any,keyword:any){
    let body    :   string  =   'm=findProperty&folio='+ this.usuarioProvider.companyid +'&num_desarrollo='+ dev +'&statusId='+status + '&kwEsp='+keyword,
    header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options :   any     =   new RequestOptions({headers: header});

    console.log(this.url +'?d=0&'+ body);
    return this.http.post(this.url, body, options);
  }

  sharingPropiedad(){
    let body    :   string  =   'm=findProperty&folio='+this.usuarioProvider.companyid,
        header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
        options :   any     =   new RequestOptions({headers: header});
      console.log("la respuesta")
      console.log(this.url +'?d=0&'+ body);
        return this.http.post(this.url, body, options);
  }

  sharingDesarrollo(){
    let body    :   string  =   'm=findDevelopment&folio='+ this.usuarioProvider.companyid,
    header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options :   any     =   new RequestOptions({headers: header});

    console.log(this.url +'?d=0&'+ body);
    return this.http.post(this.url, body, options);
  }

  compartirDesarrollo(idDeveloment, idUser, idContact, nombreC, mailC){
    let body    :   string  =   'm=sharingInfo&folio='+ idDeveloment + '&idAgent='+ idUser + '&idContact='+ idContact +'&type=development&nombreC='+nombreC+'&mailC='+mailC,
    header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options :   any     =   new RequestOptions({headers: header});

    console.log(this.url +'?d=0&'+ body);
    return this.http.post(this.url, body, options);
  }



  compartirPropiedad(idProperty, idUser, idContact, nombreC, mailC){
    let body    :   string  =   'm=sharingInfo&folio='+ idProperty + '&idAgent='+ idUser + '&idContact='+ idContact +'&type=property&nombreC='+nombreC+'&mailC='+mailC,
    header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options :   any     =   new RequestOptions({headers: header});

    console.log(this.url +'?d=0&'+ body);
    return this.http.post(this.url, body, options);
  }



  getDocuments(idDevelopment, idUser){
    let body    :   string  =   'm=directory&folio='+ idDevelopment + '&user='+ idUser,
    header  :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
    options :   any     =   new RequestOptions({headers: header});

    console.log(this.url +'?d=0&'+ body);
    return this.http.post(this.url, body, options);
  }



}

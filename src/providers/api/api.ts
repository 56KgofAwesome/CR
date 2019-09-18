import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  //url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
  url:any = 'http://api.immosystem.com.mx';
  header: any =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  options: any = new RequestOptions({headers: this.header})

  constructor(public http: Http) {

  }
  post(body){
      return this.http.post(this.url, body, this.options);
  }
  //--------------------------------------------------------------------------------------------------------
  //API solo contruye los headers
  //Obtener los datos del usuario
  /*get(nombre,contra){
    return new Promise((resolve)=>{
      let body    : string = 'm=login&email='+ nombre +'&password='+ contra,
          header  : any    =  new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
          options : any    =  new RequestOptions({headers: header});
      this.http.post(this.url, body, options)
      .subscribe(data=>{
        var WTF = data.json();
        resolve(data.status);
      })
    })
  }*/
}

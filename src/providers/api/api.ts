//import { HttpClient } from '@angular/common/http';
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
    //Método POST
    post(body){
        return this.http.post(this.url, body, this.options);
    }

}

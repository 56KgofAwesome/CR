import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PropiedadesProvider } from '../../providers/propiedades/propiedades';

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
  idDevelopment:any;
  $_SESSION:any;
  section:any;
  section2:any='images';
  plans:any;
  availables:any;
  solds:any;
  type:any;
  keyword:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public propiedadesProvider: PropiedadesProvider,
    public viewCtrl: ViewController
  ) {
    this.idDevelopment = this.navParams.get('development');
    this.$_SESSION = this.navParams.get('user');
    this.type = this.navParams.get('type');
    this.keyword = this.navParams.get('keyword');

  }

ionViewCanEnter(){
  if(this.type == null){

    var promise = this.propiedadesProvider.getDocuments(this.idDevelopment, this.$_SESSION);
    promise.subscribe(data=>{
      this.section = data.json().data;
      this.plans = data.json().data.masterPlan;
    });

    var promise = this.propiedadesProvider.verInventario(this.idDevelopment, 6, '');
    promise.subscribe(data=>{
      this.solds = data.json().data;
    });

    var promise = this.propiedadesProvider.verInventario(this.idDevelopment, 1, '');
    promise.subscribe(data=>{
      this.availables = data.json().data;
    });

  }else if(this.type == 'prospect'){

    var promise = this.propiedadesProvider.verInventario('', 1, this.keyword);
    promise.subscribe(data=>{
      this.availables = data.json().data;
    });

  }

}


  returnData(folio, name){
    this.viewCtrl.dismiss({ folio: folio, name: name });
  }

}

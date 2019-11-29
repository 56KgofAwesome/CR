import { PropiedadesProvider } from './../../providers/propiedades/propiedades';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-properties',
  templateUrl: 'properties.html',
})
export class PropertiesPage {

  public properties:  any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public propiedadesProvider: PropiedadesProvider){
  }
  //---------------------------------------------
  ionViewCanEnter(){
   this.loadUserProperties();
  }
  //---------------------------------------------
  loadUserProperties(){
    var promise = this.propiedadesProvider.getProperties();
    promise.subscribe(data=>{
      this.properties = data.json().data;
      console.log(this.properties);
    })

  }

}

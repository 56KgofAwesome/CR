import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
  BuscarPage,
  DestinosPage,
  InfoPage,
  LoginPage,
  HomePage,
  TabsUsuarioPage
} from "../index.paginas";
//import { MyApp } from '../../app/app.component';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the Tabs2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs2',
  templateUrl: 'tabs2.html',
})
export class Tabs2Page {
  tab1;
  tab2;
  tab3;
  tab4;
  tab5;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('usuario').then(data => {
      if(data == null){

      }else{
        this.navCtrl.setRoot(TabsUsuarioPage);
      }
    });
    console.log("uuu");
    this.tab1 = HomePage;
    this.tab2 = LoginPage;
    this.tab3 = BuscarPage;
    this.tab4 = DestinosPage;
    this.tab5 = InfoPage;
  }

  ionViewDidLoad() {
    
    
  }
  cambiarRoot(){
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

}

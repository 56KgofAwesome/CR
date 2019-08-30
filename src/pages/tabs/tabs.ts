import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {
  BuscarPage,
  DestinosPage,
  FormularioPage,
  InfoPage,
  LoginPage,
  TabsUsuarioPage
} from "../index.paginas";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab2;
  tab3;
  tab4;
  tab5;
  tab6;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.tab2 = LoginPage;
    this.tab3 = BuscarPage;
    this.tab4 = DestinosPage;
    this.tab5 = InfoPage;
    console.log("usuario normal");
    events.subscribe('user:created', (user, time)=>{
      this.navCtrl.setRoot(TabsUsuarioPage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }



}

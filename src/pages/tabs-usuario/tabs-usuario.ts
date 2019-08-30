import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  Events, 
  UrlSerializer
} from 'ionic-angular';
import {
  BuscarPage,
  DestinosPage,
  InfoPage,
  ContactosPage,
  LoginPage,
  UsuarioPage,
  CalendarPage
} from "../index.paginas";
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the TabsUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-usuario',
  templateUrl: 'tabs-usuario.html',
})
export class TabsUsuarioPage {
  tab5;
  tab6;
  tab7;
  tab8;
  tab9;
  log = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events
  ) {
    events.subscribe('user:logOut', (user, time)=>{
      this.navCtrl.setRoot(TabsPage);
    });
    console.log("estoy en tabs");
    this.tab5 = UsuarioPage;
    this.tab6 = BuscarPage;
    this.tab7 = DestinosPage;
    this.tab8 = CalendarPage;
    this.tab9 = ContactosPage;
  }

}

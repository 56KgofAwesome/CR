import { ElementEnablerProvider } from './../../providers/element-enabler/element-enabler';
import { Component } from '@angular/core';
import { IonicPage,NavController,NavParams,Events,UrlSerializer} from 'ionic-angular';
import { InventoryPage, BuscarPage,DestinosPage,InfoPage,ContactosPage,LoginPage,UsuarioPage,CalendarPage} from '../index.paginas';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-tabs-usuario',
  templateUrl: 'tabs-usuario.html'
})
export class TabsUsuarioPage {
  tabDatos;
  tabInventory;
  tab6;
  tab7;
  tab8;
  tabContactos;
  log = false;

  showElement: any = {};

  constructor(public navCtrl: NavController,public navParams: NavParams,public events: Events,public enabler: ElementEnablerProvider) {
    events.subscribe('user:logOut', (user, time) => {
    this.navCtrl.setRoot(TabsPage);
  });

    this.tabDatos = UsuarioPage;
    this.tabInventory = InventoryPage;
    this.tab6 = BuscarPage;
    this.tab7 = DestinosPage;
    this.tab8 = CalendarPage;
    this.tabContactos = ContactosPage;
  }
  //--------------------------------------------------------------
  ionViewCanEnter() {
    this.showElement = this.enabler.tabsUsuarioEnabler();
    console.log(this.showElement);
  }
}

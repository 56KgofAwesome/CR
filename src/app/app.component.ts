import { Component } from '@angular/core';
import { Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Tabs2Page } from '../pages/tabs2/tabs2';
import { TabsUsuarioPage } from '../pages/tabs-usuario/tabs-usuario';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ApiProvider } from '../providers/api/api';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  conexion: Boolean;
  loading: any;
  datos: any = {};
  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public alertCtrl: AlertController,
    public networkProvider: NetworkProvider,
    public network: Network,
    public events: Events,
    public loadingCtrl: LoadingController,
    public usuario: UsuarioProvider,
    public apiProvider: ApiProvider
  ) {
    this.storage.get('userToken').then(token => {
      if (token == null) {
        this.rootPage = Tabs2Page;
      } else {
        //this.usuario.loginToken(token);
        this.rootPage = TabsUsuarioPage;
      }
    });

    platform.ready().then(() => {
      statusBar.styleBlackOpaque();
      if (platform.is('android')) {
        statusBar.overlaysWebView(true);
        statusBar.backgroundColorByHexString('#bf0d2e');
        statusBar.styleLightContent();
      }

      //if (platform.is('ios')) {
      //statusBar.overlaysWebView(false);                 /**La barra de estado se establece en estado fixed*/
      //statusBar.styleBlackOpaque();                     /**Use la barra de estado blackOpaque (texto claro, para fondos oscuros). */
      //statusBar.backgroundColorByHexString('#000000');  /**Establece el color del status bar, SOLO IOS */
      //}

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        //this.networkAlert();
      });

      // Online event
      this.events.subscribe('network:online', () => {
        //this.finishNetworkAlert();
      });

      statusBar.styleDefault();
      var $this = this;
      setTimeout(function() {
        $this.splashScreen.hide();
      }, 10000);
    });

    var promise = this.networkProvider.ping();
    promise.subscribe(
      data => {
        if (data.status == 200) {
        } else {
        }
      },
      error => {
        this.networkAlert();
      }
    );
  }

  networkAlert() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div style="background-color: black;">
        <div style="background-color: black;">No hay conexion a internet. <br> Conecte a internet</div>
      </div>`
    });

    this.loading.present();
  }

  finishNetworkAlert() {
    this.loading.dismiss();
  }
}

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
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  conexion:Boolean;
  loading:any;
  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public alertCtrl: AlertController,
    public networkProvider: NetworkProvider,
    public network: Network,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {


    platform.ready().then(() => {

      //statusBar.styleBlackOpaque();
      //if (platform.is('android')) {
          //statusBar.overlaysWebView(true);
          //statusBar.backgroundColorByHexString('#000000');
          //statusBar.styleLightContent();
      //}

      if (platform.is('ios')) {
        statusBar.overlaysWebView(false);                 /**La barra de estado se establece en estado fixed*/
        statusBar.styleBlackOpaque();                     /**Use la barra de estado blackOpaque (texto claro, para fondos oscuros). */
        statusBar.backgroundColorByHexString('#1F2321');  /**Establece el color del status bar, SOLO IOS */
      }

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        this.networkAlert();
      });

      // Online event
      this.events.subscribe('network:online', () => {
          this.finishNetworkAlert();
      });


      statusBar.styleDefault();
      var $this = this;
      setTimeout(function(){
        $this.splashScreen.hide();
      },10000);



    });

    var promise = this.networkProvider.ping();
    promise.subscribe(data => {
      if(data.status == 200){
      }else{
      }
    }, error => {
      this.networkAlert();
    })


    this.storage.get('userToken').then(data => {
      if(data == null){
        console.log('no hay token');
        console.log(data);
        this.rootPage = Tabs2Page;
      }else{
        console.log('Si hay token');
        console.log(data);
        this.rootPage = TabsUsuarioPage;
      }
    });
  }



  networkAlert(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div style="background-color: black;">
        <div style="background-color: black;">no hay conexion a internet. <br> Conecte a inernet</div>
      </div>`
    });

    this.loading.present();
  }

  finishNetworkAlert(){
    this.loading.dismiss();
  }




}

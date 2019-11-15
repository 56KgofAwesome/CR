import { Injectable } from '@angular/core';
import { AlertController, Events, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Http, Headers, RequestOptions } from '@angular/http';

export enum ConnectionStatusEnum {
    Online,
    Offline
}


@Injectable()
export class NetworkProvider {
    url:any = 'https://www.immosystem.com.mx/appImmov2/immoApp2.php';
  previousStatus;

  constructor(
        public alertCtrl: AlertController,
        public network: Network,
        public eventCtrl: Events,
        public platform: Platform,
        public http :   Http
        ) {
        this.previousStatus = ConnectionStatusEnum.Online;

  }

    public initializeNetworkEvents(): void {


        this.network.onDisconnect().subscribe(() => {
            //if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            //}
            //this.previousStatus = ConnectionStatusEnum.Offline;
        });

        this.network.onConnect().subscribe(() => {
            //if (this.previousStatus === ConnectionStatusEnum.Offline) {
                this.eventCtrl.publish('network:online');
            //}
            //this.previousStatus = ConnectionStatusEnum.Online;
        });
    }


    ping(){
        let body        :   string  =   '',
            header      :   any     =   new Headers({'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
            options     :   any     =   new RequestOptions({headers: header});
        return this.http.post(this.url, body, options);
    }





}

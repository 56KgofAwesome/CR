import { UsuarioProvider } from './../../providers/usuario/usuario';
import { PropiedadesProvider } from './../../providers/propiedades/propiedades';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  
  public properties: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public propiedadesProvider: PropiedadesProvider,
              public usuarioProvider: UsuarioProvider
  ) {
    this.loadUserInventory();
  }
  //-----------------------------------------
  //Obtiene el inventario del usuario
  loadUserInventory(){
    var promise = this.propiedadesProvider.getUserProperties(this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken,this.usuarioProvider.datos.properties);
    promise.subscribe(data=>{
      this.properties  = data.json();
      console.log(this.properties.data);

    })

  }

}

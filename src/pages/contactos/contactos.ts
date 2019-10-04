import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import {
  VerContactoPage,
  AgregarCompradoresPage
} from '../index.paginas';
import { AgregarContactoPage } from '../agregar-contacto/agregar-contacto';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ContactosProvider } from '../../providers/contactos/contactos';


@IonicPage()
@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class ContactosPage {
  myInput: any;
  id: any;
  contactos: any[];
  referidos: any[];
  potenciales: any[];
  datos: {};
  tipo: any = 'compradores';
  agrC: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
    public usuarioProvider: UsuarioProvider,
    private contactosProvider: ContactosProvider
  ) {

  }

  ionViewCanEnter() {
      this.showContactsList();
      this.showReferedContactsList();
      this.showPotencialContactsList();
  }

  callContact(numero: any) {
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('llamando', res))
      .catch(err => console.log('error de llamada', err));
  }

  verContacto(id: any, tipo: any ) {
    this.navCtrl.push(VerContactoPage, { 'id': id,
                                         'tipo': tipo });
  }

  agregarContacto() {
    let modal = document.getElementById("modal");
    modal.style.display = "block";

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  onInput($event) {
    var contactos = document.getElementsByClassName('contactos');
    for (let i = 0; i < contactos.length; i++) {
      var item = contactos[i].getAttribute('name');
      if (item == this.myInput) {
      }
    }
  }

  onCancel($event) {

  }

  refreshPage(refresher) {
    this.showContactsList();
    this.showReferedContactsList();
    this.showPotencialContactsList();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  buscar(palabra) {
    var filtro, palabras, item;
    filtro = palabra.target.value.toUpperCase();
    item = document.getElementById("myUL");
    palabras = item.getElementsByTagName("ion-item")
    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i].innerText.toUpperCase().indexOf(filtro) > -1) {
        palabras[i].style.display = "";
      } else {
        palabras[i].style.display = "none";
      }
    }
  }

  onSearch(event) {
  }

  agregarTipo() {
    if (this.agrC == 1) {
      this.navCtrl.push(AgregarContactoPage);
      let modal = document.getElementById("modal");
      modal.style.display = "none";
      this.agrC = 0;
    } else {
      this.navCtrl.push(AgregarCompradoresPage);
      let modal = document.getElementById("modal");
      modal.style.display = "none";
      this.agrC = 0;
    }
  }


  cerrarModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
  }
  //----------------------------------------------------------------------------
  //Método para obtener la lista de contactos
  showContactsList(){
    var promise = this.contactosProvider.getContactsList(this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
    promise.subscribe(data => {
      this.contactos = data.json().data;
      console.log(this.contactos);
    });
  }
  //----------------------------------------------------------------------------
  //Método para obtener la lista de contactos referidos
  showReferedContactsList(){
    var promise = this.contactosProvider.getReferedContactsList(this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
    promise.subscribe(data => {
      this.referidos = data.json().data;
    });
  }
  //----------------------------------------------------------------------------
  //Método para obtener la lista potenciales compradores
  showPotencialContactsList(){
    var promise = this.contactosProvider.getPotencialContactsList(this.usuarioProvider.datos.id,this.usuarioProvider.datos.userToken);
    promise.subscribe(data => {
      this.potenciales = data.json().data;
    });
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import {
  VerContactoPage,
  AgregarCompradoresPage
} from '../index.paginas';
import { AgregarContactoPage } from '../agregar-contacto/agregar-contacto';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';


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
    private storage: Storage
  ) {
  }

  ionViewCanEnter() {
    this.storage.get('usuario').then((data) => {
      this.id = data;
      var promise = this.usuarioProvider.cargarContacto(data);
      promise.subscribe(data => {
        this.contactos = data.json().data;
      });

      var promise = this.usuarioProvider.cargarContactoReferidos(data);
      promise.subscribe(data => {
        this.referidos = data.json().data;
      });

      var promise3 = this.usuarioProvider.cargarContactoPotencial(1671);
      promise3.subscribe(data => {
        this.potenciales = data.json().data;
      });
    });
  }

  llamar(numero: any) {
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('llamando', res))
      .catch(err => console.log('error de llamada', err));
  }

  verContacto(id: any, tipo) {
    this.navCtrl.push(VerContactoPage, { 'id': id, 'tipo': tipo });
  }

  agregarContacto() {
    //this.navCtrl.push(AgregarCompradoresPage);
    //this.navCtrl.push(AgregarCompradoresPage);
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

  refrescar(refresher) {

    var promise = this.usuarioProvider.cargarContacto(this.id);
    promise.subscribe(data => {
      this.contactos = data.json().data;
    })

    var promise2 = this.usuarioProvider.cargarContactoReferidos(this.id);
    promise2.subscribe(data => {
      this.referidos = data.json().data;
    });

    var promise3 = this.usuarioProvider.cargarContactoPotencial(1671);
    promise3.subscribe(data => {
      this.potenciales = data.json().data;
    });


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






}

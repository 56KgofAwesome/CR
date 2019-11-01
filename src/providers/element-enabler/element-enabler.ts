/*Provider que se encarga de habilitar o desabilitar elementos*/
import { Injectable } from '@angular/core';

@Injectable()
export class ElementEnablerProvider {
  //Página principal del usuario
  // nombre_de_la_paginaPages: any = {}
  public usuarioPages       : any = {};
  public contactosPages     : any = {};
  public verContactoPages   : any = {};


  constructor(){

  }
  //----------------------------------------------------------------------------
  //Una función por página
  //Página Usuario
  usuarioEnabler(){
    this.usuarioPages.imageUser = true;
    this.usuarioPages.nameTagEnabled = true;
    this.usuarioPages.cellPhoneTagEnabled = true;
    this.usuarioPages.telephoneTagEnabled = true;
    this.usuarioPages.logoEnabled = true;
    this.usuarioPages.animatedFooter = true;
    return this.usuarioPages;
  }
  //----------------------------------------------------------------------------
  //Página Contactos
  contactosEnabler(){
    //Objetos Primarios
    this.contactosPages.botones = {};
    this.contactosPages.elementos = {};
    //Elementos Secundarios
    this.contactosPages.botones.addContactButton = true;
    this.contactosPages.botones.addReferedOption = true;
    this.contactosPages.botones.addBuyerOption = true;
    //
    this.contactosPages.elementos.searchBar = true;
    return this.contactosPages;
  }
  //----------------------------------------------------------------------------
  //Página Ver Contacto
  verContactoEnabler(){
    //Objetos Primarios
    this.verContactoPages.botones = {};
    this.verContactoPages.elementos = {};
    //Objetos Secundarios
    this.contactosPages.botones.sendMailButton = false;
    this.contactosPages.botones.newComentButton = false;
    this.contactosPages.botones.sendFlyerButton = false;
    this.contactosPages.botones.sendBroshureButton = false;
    //



    return this.contactosPages;
  }
}

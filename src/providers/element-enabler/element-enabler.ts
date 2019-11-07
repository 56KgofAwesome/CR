/*Provider que se encarga de habilitar o desabilitar elementos*/
import { Injectable } from '@angular/core';

@Injectable()
export class ElementEnablerProvider {
  //Página principal del usuario
  // nombre_de_la_paginaPages: any = {}
  public usuarioPages       : any = {};
  public contactosPages     : any = {};
  public verContactoPages   : any = {};
  public addReferedPages    : any = {};
  public addBuyer    : any = {};


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
    this.verContactoPages.buttons = {};
    this.verContactoPages.elements = {};
    //Objetos Secundarios
    this.verContactoPages.buttons.sendMailButton = true;
    this.verContactoPages.buttons.newComentButton = true;
    this.verContactoPages.buttons.sendFlyerButton = true;
    this.verContactoPages.buttons.sendBroshureButton = true;
    this.verContactoPages.buttons.callButton = true;
    //
    this.verContactoPages.elements.nameTag = true;
    this.verContactoPages.elements.dateTag = true;
    this.verContactoPages.elements.assignTag = true;
    this.verContactoPages.elements.cellphoneTag = true;
    this.verContactoPages.elements.nextelTag = true;
    this.verContactoPages.elements.mailTag = true;
    this.verContactoPages.elements.commentTag =true;
    this.verContactoPages.elements.sendTag = true;

    return this.verContactoPages;
  }
  //----------------------------------------------------------------------------
  //Formulario Añadir visita
  addReferedEnabler(){
    this.addBuyer.elements.nombre = {required: false, enabled: true };

  }
  //----------------------------------------------------------------------------
}

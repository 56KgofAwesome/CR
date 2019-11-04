import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  title     : any;
  subtitle  : any;
  content   : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = "Desde 1972";
    this.subtitle = "CONSTRUYENDO CONFIANZA";
    this.content = "  Nuestras labores se orientan al diseño, la construcción, operación y comercialización de desarrollos inmobiliarios de carácter habitacional, comercial, industrial y de almacenamiento. Damos valor especial a cada proyecto, al realizar un estudio detallado del entorno para descubrir la auténtica vocación del desarrollo a construir, así mismo cuidamos las características del suelo, su localización, vías de acceso, servicios y principalmente el armonizar con el paisaje y concepto arquitectónico de las privadas y sus casas.   De igual manera compaginamos los espacios, diseños y detalles a las necesidades, deseos y gustos del mercado, procurando sobrepasar sus expectativas.   Donde construye Grupo Santa Rita está el desarrollo... frase que confirma, el ser pioneros en la construcción de polos habitacionales, que se han convertido en centros productivos para el crecimiento social y económico de la población y de la ciudad misma.";
  }
  //----------------------------------------------------------------------------


}

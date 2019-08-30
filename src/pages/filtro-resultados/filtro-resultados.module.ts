import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroResultadosPage } from './filtro-resultados';

@NgModule({
  declarations: [
    FiltroResultadosPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltroResultadosPage),
  ],
})
export class FiltroResultadosPageModule {}

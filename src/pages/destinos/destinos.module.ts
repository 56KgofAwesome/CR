import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DestinosPage } from './destinos';

@NgModule({
  declarations: [
    DestinosPage,
  ],
  imports: [
    IonicPageModule.forChild(DestinosPage),
  ],
})
export class DestinosPageModule {}

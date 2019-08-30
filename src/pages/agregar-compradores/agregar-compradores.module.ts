import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarCompradoresPage } from './agregar-compradores';

@NgModule({
  declarations: [
    AgregarCompradoresPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarCompradoresPage),
  ],
})
export class AgregarCompradoresPageModule {}

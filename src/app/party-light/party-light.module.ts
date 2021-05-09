import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartyLightPageRoutingModule } from './party-light-routing.module';

import { PartyLightPage } from './party-light.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyLightPageRoutingModule
  ],
  declarations: [PartyLightPage]
})
export class PartyLightPageModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Step2RoutingModule} from './step2-routing.module';
import {Step2Component} from './step2.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    Step2Component,
  ],
  imports: [
    CommonModule,
    Step2RoutingModule,
    SharedModule,
  ]
})
export class Step2Module { }

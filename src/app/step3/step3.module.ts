import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step3RoutingModule } from './step3-routing.module';
import { Step3Component } from './step3.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { QuizStep3Component } from './quiz-step3/quiz-step3.component';
import { QuestionStep3Component } from './app-question-step3/question-step3.component';


@NgModule({
  declarations: [
    Step3Component,
    QuizStep3Component,
    QuestionStep3Component
  ],
  imports: [
    CommonModule,
    Step3RoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class Step3Module { }

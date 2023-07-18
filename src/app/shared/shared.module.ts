import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {HighLightPipe} from "../pipe/high-light.pipe";
import {DisplayCatePipe} from "../pipe/display-cate.pipe";
import {QuizComponent} from "../quiz/quiz.component";
import {QuestionComponent} from "./question/question.component";
import {DropDownComponent} from "../step2/drop-down/drop-down.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AnswersComponent} from "./answers/answers.component";

@NgModule({
  declarations: [HeaderComponent,HighLightPipe,DisplayCatePipe,QuizComponent,QuestionComponent,DropDownComponent,AnswersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,ReactiveFormsModule,FormsModule
  ],
  exports:[HeaderComponent,HighLightPipe,DisplayCatePipe,QuizComponent,QuestionComponent,DropDownComponent,
    RouterModule,ReactiveFormsModule,FormsModule,AnswersComponent]
})
export class SharedModule { }

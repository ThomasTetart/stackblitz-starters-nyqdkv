import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1Component } from './step1.component';
import {QuizService} from "../service/quiz.service";

const routes: Routes = [{ path: '', component: Step1Component, resolve:{categories:() => inject(QuizService).getAllCategories()}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step1RoutingModule { }

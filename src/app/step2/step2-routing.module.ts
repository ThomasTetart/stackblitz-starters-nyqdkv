import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step2Component } from './step2.component';
import {QuizService} from "../service/quiz.service";

const routes: Routes = [{ path: '', component: Step2Component, resolve:{categories:()=>(inject(QuizService).getAllCategories())}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step2RoutingModule { }

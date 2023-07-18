import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step3Component } from './step3.component';
import {QuizService} from "../service/quiz.service";

const routes: Routes = [{ path: '', component: Step3Component, resolve:{categories:()=>(inject(QuizService).getAllCategories())}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step3RoutingModule { }

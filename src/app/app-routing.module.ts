import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {QuizService} from "./service/quiz.service";
import {AnswersComponent} from "./shared/answers/answers.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: "result", component: AnswersComponent, resolve: {data: () => inject(QuizService).getLatestResults()}},
  { path: 'step1', loadChildren: () => import('./step1/step1.module').then(m => m.Step1Module)  },
  { path: 'step2', loadChildren: () => import('./step2/step2.module').then(m => m.Step2Module) },
  { path: 'step3', loadChildren: () => import('./step3/step3.module').then(m => m.Step3Module) },
  { path: '**', redirectTo:'' ,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

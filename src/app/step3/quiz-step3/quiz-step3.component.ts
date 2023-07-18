import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Difficulty, Question} from "../../model/data.models";
import {QuizService} from "../../service/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-step3',
  templateUrl: './quiz-step3.component.html',
  styleUrls: ['./quiz-step3.component.css']
})
export class QuizStep3Component {
  @Input() questions: Question[] | null = [];

  @Input() currentCategory!:number | null;
  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  @Input() isResetQuestion!:boolean;
  @Output() isResetQuestionChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  switchQ(question:Question){
    if(this.currentCategory){
      this.quizService.createQuiz(this.currentCategory.toString(),question.difficulty as Difficulty,6).subscribe(val=>{
        this.quizService.switchQuestion.next(this.quizService.computeSwitchQuestion(question,this.questions!,val));
        this.isResetQuestionChange.emit(true);
      });
    }
  }

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }
}

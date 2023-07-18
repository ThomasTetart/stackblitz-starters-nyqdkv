import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from "../../model/data.models";

@Component({
  selector: 'app-question-step3',
  templateUrl: './question-step3.component.html',
  styleUrls: ['./question-step3.component.css']
})
export class QuestionStep3Component {
  @Input({required: true})
  question!: Question;
  @Input()
  correctAnswer?: string;

  @Input() isReset! :boolean;

  @Input()
  userAnswer?: string;

  @Output() switchQuestion = new EventEmitter<Question>();

  getButtonClass(answer: string): string {
    if (! this.userAnswer) {
      if (this.currentSelection == answer)
        return "tertiary";
    } else {
      if (this.userAnswer == this.correctAnswer && this.userAnswer == answer)
        return "tertiary";
      if (answer == this.correctAnswer)
        return "secondary";
    }
    return "primary";
  }

  @Output()
  change = new EventEmitter<string>();

  currentSelection!: string;

  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(answer);
  }

  switchQu(){
    console.log(this.question);
    this.switchQuestion.emit(this.question);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subject} from 'rxjs';
import {Category, Difficulty, ApiQuestion, Question, Results} from '../model/data.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private API_URL = "https://opentdb.com/";
  private latestResults!: Results;

  switchQuestion = new Subject<Question[]>();

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<{ trivia_categories: Category[] }>(this.API_URL + "api_category.php").pipe(
      map(res => res.trivia_categories)
    );
  }

  createQuiz(categoryId: string, difficulty: Difficulty,nb:number = 5): Observable<Question[]> {
    return this.http.get<{ results: ApiQuestion[] }>(
        `${this.API_URL}/api.php?amount=${nb}&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      .pipe(
        map(res => {
          const quiz: Question[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index])
        score++;
    })
    this.latestResults = {questions, answers, score};
  }

  getLatestResults(): Results {
    return this.latestResults;
  }

  computeSwitchQuestion(question:Question,oldQuiz:Question[],newQuestion:Question[]):Question[]{
    let ret:Question[] = [...oldQuiz];
    newQuestion.every(newQues=>{
      //Test if new Question is in oldQuiz
      if(oldQuiz.filter(val=>val.question == newQues.question).length === 0){
        let index = oldQuiz.findIndex(val=>val.question == question.question);
        ret.splice(index,1,newQues);
        return false;
      }
      return true;
    })
    return ret;
  }

}

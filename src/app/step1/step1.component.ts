import {Component, inject} from '@angular/core';
import {ApiQuestion, Category, Difficulty, Question} from '../model/data.models';
import {map, Observable, tap, withLatestFrom} from 'rxjs';
import {QuizService} from '../service/quiz.service';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {distinctCategory, format} from "../shared/utile";

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component {

  categories$: Observable<Category[]>;
  subCategories$! : Observable<Category[]>;
  questions$!: Observable<Question[]>;

  get selectCategory() {return this.formQuiz.get('selectCategory')};
  get selectSubCategory() {return this.formQuiz.get('selectSubCategory')};
  get selectDifficulty() {return this.formQuiz.get('selectDifficulty')};

  formQuiz: FormGroup;

  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  protected quizService: QuizService = inject(QuizService);

  constructor() {

    this.formQuiz = new FormGroup({
      selectCategory:new FormControl<Category['id'] | null>(null,Validators.required),
      selectSubCategory:new FormControl<Category['id'] | null>(null,Validators.required),
      selectDifficulty : new FormControl<ApiQuestion['difficulty'] | null>(null,Validators.required)
      });

    //Isolate category ( Without :[subCate.]) And remove Double
    this.categories$ = this.activatedRoute.data.pipe(
      map(c=>(<Category[]>c['categories']).sort((a, b) => (a.name > b.name) ? 1 : -1)),//get data and sort
      map(c => distinctCategory(c)),//Distinct value
    );
    //Generate SubCate Observable regarding Category selected
    this.subCategories$ = this.formQuiz.get('selectCategory')!.valueChanges.pipe(
      withLatestFrom(this.activatedRoute.data.pipe(map(c=><Category[]>c['categories']))),
      map(([value,categorie]) => categorie.filter(m=> m.name.indexOf(':') !== -1 && categorie.find(f=>f.id == value)?.name.startsWith(format(m.name)))),
      tap(c=>{//Enabled / Disabled selectSubCategory FormControl
        this.formQuiz.get('selectSubCategory')?.setValue(null);//reset Val
        c.length>0?this.formQuiz.get('selectSubCategory')?.enable():this.formQuiz.get('selectSubCategory')?.disable()
      })
    );
  }

  createQuiz(): void {
    if (this.formQuiz.valid) {
      const id = this.formQuiz.get('selectSubCategory')?.value ?? this.formQuiz.get('selectCategory')?.value;
      this.questions$ = this.quizService.createQuiz(id, this.formQuiz.get('selectDifficulty')?.value as Difficulty);
    }
  }
}




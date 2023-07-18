import {Component, inject} from '@angular/core';
import {map, Observable, Subject, tap, withLatestFrom} from "rxjs";
import {ApiQuestion, Category, Difficulty, Question} from "../model/data.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../service/quiz.service";
import {distinctCategory, format, formatSub} from "../shared/utile";

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component {

  categories$: Observable<Category[]>;
  subCategories$ : Observable<Category[]>;
  questions$!: Observable<Question[]>;

  selectDifficulty =  new FormControl<ApiQuestion['difficulty'] | null>(null,Validators.required);

  formQuiz: FormGroup;

  idCategorySelected:Subject<number> = new Subject<number>();

  idCategory : number | null = null;

  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  protected quizService: QuizService = inject(QuizService);

  constructor() {

    this.formQuiz = new FormGroup({
      selectDifficulty : this.selectDifficulty
    });

    //Isolate category ( Without :[subCate.]) And remove Double
    this.categories$ = this.activatedRoute.data.pipe(
      map(c=>(<Category[]>c['categories']).sort((a, b) => (a.name > b.name) ? 1 : -1)),//get data and sort
      map(c => distinctCategory(c)),//Distinct value
      map(c => c.map(m=> {return {...m,name:format(m.name)}})),
    );

    //Generate SubCate Observable regarding Category selected
    this.subCategories$ = this.idCategorySelected.pipe(
      withLatestFrom(this.activatedRoute.data.pipe(map(c=><Category[]>c['categories']))),
      map(([value,categorie]) => categorie.filter(m=> m.name.indexOf(':') !== -1 && categorie.find(f=>f.id == value)?.name.startsWith(format(m.name)))),
        map(c => c.map(m=> {return {...m,name:formatSub(m.name)}})),
      tap(c=>{//Enabled / Disabled selectSubCategory FormControl
        this.formQuiz.get('selectSubCategory')?.setValue(null);//reset Val
        if(c.length>0)this.idCategory = null;
      })
    );
  }

  createQuiz(): void {
    if (this.formQuiz.valid && this.idCategory) {
      this.questions$ = this.quizService.createQuiz(this.idCategory.toString(), this.formQuiz.get('selectDifficulty')?.value as Difficulty);
    }
  }

  onSelectCategory(idCate:number){
    this.idCategory = idCate;
    this.idCategorySelected.next(idCate) ;
  }
}

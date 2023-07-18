import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {combineLatest, map, Observable, Subscription} from "rxjs";
import {DropWithName} from "../../model/data.models";

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})

export class DropDownComponent<T extends DropWithName> implements OnInit,OnChanges,OnDestroy{

  @Input() title = '';
  @Input() entries$!  : Observable<T[]>;
  @Input() newVal!:number | null;
  @Output() newValChange : EventEmitter<number> = new EventEmitter<number>();

  @Input() disabled = false;

  formControlInput = new FormControl<string>('');
  filteredEntries$!:Observable<T[]>;
  currentId!:number;

  nbEntries = 0;

  subscription!:Subscription[];

  start(){
    if(!this.formControlInput.touched){
      this.formControlInput.patchValue('');
      this.formControlInput.markAsTouched();
    }
  }

  ngOnChanges(){
    if(this.currentId != this.newVal)this.formControlInput.setValue('');
  }

  ngOnInit(): void {
    this.subscription = [this.entries$.subscribe(val=>{
      this.nbEntries = val.length;
    })];
    this.filteredEntries$ = combineLatest([this.formControlInput.valueChanges,this.entries$]).pipe(
      map(([inputValue,list])=>list.filter(l=>(l.name.toLowerCase().indexOf(inputValue!.toLowerCase()) !== -1))),
    );
  }
  ngOnDestroy() {
    this.subscription.forEach(s=>s.unsubscribe());
  }

  updateValue(val: T){
    this.currentId = val.id;
    this.formControlInput.setValue(val.name);
    this.newValChange.emit(val.id);
  }


}

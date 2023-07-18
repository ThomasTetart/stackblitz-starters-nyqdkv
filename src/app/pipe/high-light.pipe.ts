import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highLight'
})
export class HighLightPipe implements PipeTransform {

  transform(value: string = "", valTyped: string | null = ''): string {

    let currentIndex = 0;
    let ret = '';
    let index = this.getIndex(currentIndex,value,valTyped!);
    while(index !== -1) {
      ret += this.createBold(currentIndex,index,value,valTyped!);
      currentIndex = index + valTyped!.length;
      index = this.getIndex(currentIndex,value,valTyped!);
    }
    return ret + value.substring(currentIndex,value.length);
  }

  private getIndex(currentIndex:number,val:string,valTyped:string):number{
    if(val.toLowerCase().substring(currentIndex,val.length).indexOf(valTyped.toLowerCase()) === -1
    || valTyped.length === 0){
      return -1;
    }
    else{
      return currentIndex + val.toLowerCase().substring(currentIndex,val.length).indexOf(valTyped.toLowerCase());
    }
  }

  private createBold(from:number,index:number,value:string,valTyped:string):string{
    return value.substring(from, index) + '<b>'
      + value.substring(index, valTyped.length + index)
      + '</b>'
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayCate'
})
export class DisplayCatePipe implements PipeTransform {

  transform(value: string, type:'subCategory'|undefined = undefined): string {
    if(value.indexOf(':') === -1) return value;
    return type === 'subCategory' ? value.substring(value.indexOf(':')+1,value.length)  : value.substring(0,value.indexOf(':')) ;
  }

}

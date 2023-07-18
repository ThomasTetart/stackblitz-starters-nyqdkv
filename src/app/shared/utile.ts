import {Category} from "../model/data.models";

export function format (name:string):string{
  return name.indexOf(':') === -1 ? name : name.substring(0,name.indexOf(':'));
}
export function formatSub (name:string):string{
  return name.substring(name.indexOf(':')+1,name.length);
}
export function distinctCategory(categories:Category[]):Category[]{
  return categories.filter((item,index)=> item.name.indexOf(':') === -1 || categories.findIndex(v => v.name.startsWith(item.name.substring(0,item.name.indexOf(':')+1))) === index);
}

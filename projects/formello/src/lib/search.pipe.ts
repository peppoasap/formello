import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name : 'search' })
export class SearchPipe<T extends { [key : string] : any }> implements PipeTransform {
  transform(list: T[], searchObject : Partial<T>) {
      return list.filter(item => Object.keys(searchObject).every(key => `${item[key]}`.includes(`${searchObject[key]}`)));
  }
}

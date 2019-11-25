import { Pipe, PipeTransform } from '@angular/core';
import { DictionaryService } from '../services/dictionary.service';

@Pipe({
  name: 'dictionary'
})

export class DictionaryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const dictionaryService: DictionaryService = new DictionaryService();
    return dictionaryService.get(value);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { forEach } from 'lodash';

import { IDictionary } from '../interfaces/utils.interface';

// TODO: pure pipe
@Pipe({
  name: 'dictionaryToArray'
})
export class DictionaryToArrayPipe implements PipeTransform {
  transform(dictionary: IDictionary<any>, args?: any): any[]  {
    const resultArray: any[] = [];

    forEach(dictionary, (dictionaryValue: any, key: string) => {
      resultArray.push({key, ...dictionaryValue});
    });

    return resultArray;
  }
}

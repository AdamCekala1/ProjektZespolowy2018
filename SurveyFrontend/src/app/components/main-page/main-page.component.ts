import { Component, OnInit } from '@angular/core';
import { ISearchConfig } from '../../../../projects/ac-search-result/src/lib/shared/interfaces/search.interface';
import { SearchFormName } from '../../../../projects/ac-search-result/src/lib/components/search/search-form-names.enum';
import { IDictionary } from 'ac-login/lib/shared/interfaces/utils.interface';
import { ViewType } from '../../../../projects/ac-login/src/lib/shared/enums/view-type.enum';
import { RequestsContants } from '../../shared/constants/requests.contants';
import { RequestTypes } from '../../core/http/http.enum';
import { HttpService } from '../../core/http/http.service';
import { chain, get, map, omitBy, isEmpty } from 'lodash';

@Component({
  selector: 'ac-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  backgroundUrl = 'assets/mainpage.jpg';
  searchConfig: ISearchConfig = {
    otherSelects: [],
    inputs: {
      [SearchFormName.TEXT]: {
        value: 'Ankieta o ziemniakiach',
        isRequired: false,
        regex: '',
        title: 'xddd',
      },
      [SearchFormName.TYPE]: {
        title: 'Select type',
        value: '',
        isRequired: false,
        selectOption: {
          canBeNull: true,
          text: 'Clear selection',
        },
        values: ['x', 'y', 'z2'],
      }
    }
  };

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  searchSurveys(data: IDictionary<string>) {
    console.log(omitBy(data, isEmpty))
    console.log(isEmpty(omitBy(data, isEmpty)))

    if(isEmpty(omitBy(data, isEmpty))) {
      this.httpService.httpRequest(RequestsContants.SURVEYS.LIST, RequestTypes.GET)
        .subscribe(x => console.log(x));
    } else {
      this.httpService.httpRequest(RequestsContants.SURVEYS.LIST, RequestTypes.POST, {
        queryObj: {start: get(data, 'beginDate', ''), end: get(data, 'endDate', '')},
      }).subscribe(x => console.log(x));
    }
  }
}

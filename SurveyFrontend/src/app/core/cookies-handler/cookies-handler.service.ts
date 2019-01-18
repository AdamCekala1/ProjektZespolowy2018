import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root',
})
export class CookiesHandlerService {
  handleCookies(id: number) {
    if(!this.isResolvedSurveyById(id)) {
      Cookie.set('resolvedSurveys', JSON.stringify([...this.getActualCookiesId(), id]), 300);
    }
  }

  isResolvedSurveyById(id: number): boolean {
    return this.getActualCookiesId().includes(id);
  }

  private getActualCookiesId(): number[] {
    const idsFromCookies: string = Cookie.get('resolvedSurveys');

    return  idsFromCookies ? JSON.parse(idsFromCookies) : [];
  }
}

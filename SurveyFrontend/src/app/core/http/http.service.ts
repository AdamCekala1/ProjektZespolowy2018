import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { set } from 'lodash';
import { catchError, finalize, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RequestTypes } from './http.enum';
import { IDictionary } from '../../shared/interfaces/utils.interfaces';
import { RequestsContants } from '../../shared/constants/requests.contants';
import { StorageService } from '../storage/storage.service';
import { UserHelperService } from '../user/user-helper.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor( private http: HttpClient, private userHelperService: UserHelperService) {
  }

  httpRequest(resourcePath: string,
              requestType: RequestTypes,
              requestOptions: any = {}): Observable<HttpResponse<any>> {
    const path: string = RequestsContants.prefix + resourcePath;
    const defaultParams: any = {
      withCredentials: true,
      headers: new HttpHeaders({'Authorization': `Bearer ${StorageService.getToken()}`}),
      observe: 'response'
  };
    let request: Observable<any>;

    if(requestType === RequestTypes.GET) {
      request = this.http.get<any>(path, {params: requestOptions.queryObj, ...defaultParams}).pipe(retry(1));
    } else if(requestType === RequestTypes.DELETE) {
      const options: IDictionary<any> = {body: requestOptions.queryObj, ...defaultParams};

      request = this.http.delete<any>(path, options);
    } else {
      request = this.http[requestType]<any>(path, requestOptions.queryObj, defaultParams);
    }

    console.log(requestOptions.queryObj)


    console.log('start request')
    return this.getRequest(request, requestOptions);
  }

  private getRequest(request: Observable<Object>,
                     requestOptions: any = {}): Observable<any> {
    return request.pipe(
      catchError((error: any) => {
        console.log('display error', error);
        if(error.status === 401) {
          this.userHelperService.seTtriggerLogoutUser();
        }

        return throwError(error);
      }),
      finalize(() => console.log('stop request'))
    );
  }
}

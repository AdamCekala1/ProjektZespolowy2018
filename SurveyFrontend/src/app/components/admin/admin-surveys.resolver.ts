import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ISurvey } from '../../shared/interfaces/result.interface';
import { AdminService } from './admin.service';

@Injectable()
export class AdminSurveysResolver implements Resolve<Observable<ISurvey[]>> {
  constructor(private adminService: AdminService) {}

  resolve(): Observable<ISurvey[]> {
    return this.adminService.fetchAdminSurveys();
  }
}

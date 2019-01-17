import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { ICategories } from '../../core/categories/categories.interface';

@Injectable()
export class AdminCategoriesResolver implements Resolve<Observable<ICategories[]>> {
  constructor(private adminService: AdminService) {}

  resolve(): Observable<ICategories[]> {
    return this.adminService.fetchCategories();
  }
}

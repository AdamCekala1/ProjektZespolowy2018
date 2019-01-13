import { Injectable } from '@angular/core';
import { IUser } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static setToken(token: string) {
    StorageService.setItem('token', token);
  }

  static getToken(): string {
    return StorageService.getItem('token');
  }

  static setUser(user: IUser) {
    StorageService.setItem('user', user);
  }

  static getUser(): IUser {
    return StorageService.getItem('user');
  }

  static setItem(key: string, Obj: any) {
    sessionStorage.setItem(key, JSON.stringify(Obj || ''));
  }

  static getItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

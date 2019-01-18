import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../../shared/interfaces/user.interface';
import { Subject } from 'rxjs';
import { UserFormName } from '../user-form-name.enum';
import { get, isEqual, cloneDeep } from 'lodash';
import { UserService } from '../../../core/user/user.service';
import { SurveysService } from '../../../core/surveys/surveys.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDictionary } from '../../../shared/interfaces/utils.interfaces';
import { regexs } from '../../../shared/constants/login-register.config';

@Component({
  selector: 'ac-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  userFormName = UserFormName;
  user: IUser;
  clonedUser: IUser;
  form: FormGroup;
  @Output() onSubmit: EventEmitter<IDictionary<string>> = new EventEmitter();
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userService.getUser()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((user: IUser) => {
        this.user = user;
        this.clonedUser = cloneDeep(user);

        this.initForm(user);
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }

  saveChangedUserData() {
    this.onSubmit.emit(this.form.value);
  }

  private initForm(data?: IUser) {
    this.form = this.formBuilder.group({
      [UserFormName.NAME]: get(data, 'name', ''),
      [UserFormName.SURNAME]: get(data, 'surname', ''),
      [UserFormName.AGE]: [get(data, 'age', ''), Validators.pattern(regexs.AGE)],
      [UserFormName.CITY]: get(data, 'city', ''),
      [UserFormName.EMAIL]: [get(data, 'email', ''), Validators.pattern(regexs.EMAIL)],
    });
  }
}

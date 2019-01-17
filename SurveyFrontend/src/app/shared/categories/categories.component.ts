import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../core/categories/categories.service';
import { Observable, Subject } from 'rxjs';
import { ICategories } from '../../core/categories/categories.interface';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ac-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() isActionButtons: boolean = false;
  @Input() isAddNewCategorySection: boolean = false;
  @Input() activeId: number;
  @Output() onSelect: EventEmitter<ICategories> = new EventEmitter();
  categories: ICategories[] = [];
  isLoading: boolean = true;
  newCategoryName: string = '';
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.getCategories()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((categories: ICategories[]) => {
        this.categories = categories;

        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }

  remove(event: ICategories) {
    this.isLoading = true;

    this.categoriesService.remove(event.id).pipe(finalize(() => this.isLoading = false)).subscribe();
  }

  edit(category: ICategories) {
    console.log(category);
  }

  add() {
    this.isLoading = true;

    this.categoriesService.add(this.newCategoryName).pipe(finalize(() => {
      this.isLoading = false;

      this.newCategoryName = '';
    })).subscribe();
  }

  select(event: ICategories) {
    this.onSelect.emit(event);
  }

  private getCategories(): Observable<ICategories[]> {
    return this.categoriesService.getCategories();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategories } from '../../../core/categories/categories.interface';
import { finalize } from 'rxjs/operators';
import { CategoriesService } from '../../../core/categories/categories.service';

@Component({
  selector: 'ac-categories-content-list',
  templateUrl: './categories-content-list.component.html',
  styleUrls: ['./categories-content-list.component.scss']
})
export class CategoriesContentListComponent {
  @Input() category: ICategories;
  @Input() isActionButtons: boolean = false;
  @Input() activeId: number;
  @Output() onSelect: EventEmitter<ICategories> = new EventEmitter();
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter();
  isEdit: boolean = false;
  newCategoryName: string = '';

  constructor(private categoriesService: CategoriesService) {
  }

  setIsEdit(isEdit: boolean) {
    this.isEdit = isEdit;
  }

  closeEditMode() {
    this.setIsEdit(false);

    this.newCategoryName = '';
  }

  select() {
    this.onSelect.emit(this.category);
  }

  remove() {
    this.isLoading.emit(true);

    this.categoriesService.remove(this.category.id).pipe(finalize(() => this.isLoading.emit(false))).subscribe();
  }

  edit() {
    this.isLoading.emit(true);

    this.categoriesService.edit(this.newCategoryName, this.category.id)
      .pipe(finalize(() => this.isLoading.emit(false))).subscribe();
  }
}

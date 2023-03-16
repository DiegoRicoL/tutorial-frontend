import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  createCategory(): void {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe( result => {
      this.ngOnInit();
    });

  }

  editCategory(category: Category) {
    console.log(category);

    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category: category }
    });



    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteCategory(category: Category) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar categoría", description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      categories => this.dataSource.data = categories
    );
  }

}

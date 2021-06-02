import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookItemComponent } from './book-item/book-item.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [BooksComponent, BookItemComponent, ModalComponent],
  imports: [CommonModule, BooksRoutingModule],
})
export class BooksModule {}

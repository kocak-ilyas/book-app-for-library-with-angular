import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books!: Book[];

  dialog = { show: false, message: 'No message!!!' };

  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe((res: Book[]) => {
      this.books = res;
    });
  }

  addDialog(postResponse: string) {
    this.dialog = {
      message: postResponse,
      show: true,
    };
    window.setTimeout(() => {
      this.dialog.show = false;
    }, 5000);
    this.getBooks();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  // bookItems = {
  //   imageUrl:
  //     'https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_960_720.jpg',
  //   name: 'Book1',
  //   available: true,
  //   page: 5,
  //   date: Date.now(),
  //   explanation: 'Book is very goood',
  // };
  books!: Book[];

  items = ['item1', 'item2', 'item3', 'item4'];
  dialogs = ['dialog1', 'dialog2'];

  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe((res: Book[]) => {
      this.books = res;
      console.log(this.books);
    });
  }
  addItem(newItem: string) {
    this.items.push(newItem);
    console.log(this.items);
  }
  addDialog(newDialog: string) {
    this.dialogs.push(newDialog);
    console.log(this.dialogs);
  }
}

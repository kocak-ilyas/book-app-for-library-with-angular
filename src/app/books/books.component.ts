import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
 
  constructor(public bookService: BookService) {}
  ngOnInit(): void {
    this.bookService.getBooks()
  }
}

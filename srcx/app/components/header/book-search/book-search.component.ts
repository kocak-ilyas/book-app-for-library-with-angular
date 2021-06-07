import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  constructor(public bookService: BookService) {}
  ngOnInit(): void {}
}

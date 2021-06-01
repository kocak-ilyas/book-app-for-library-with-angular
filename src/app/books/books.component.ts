import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  bookItems = {
    imageUrl:
      'https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_960_720.jpg',
    name: 'Book1',
    available: true,
    page: 5,
    date: Date.now(),
    explanation: 'Book is very goood',
  };
  constructor() {}
  ngOnInit(): void {}
}

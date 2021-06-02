import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnInit {
  @Input() Books!: Book;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() book!: Book;
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
  constructor() {}
  ngOnInit(): void {}
  // openUpdateBookModal(): void {}
}

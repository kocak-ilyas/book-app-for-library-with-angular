import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css'],
})
export class BookModalComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private fbBook: FormBuilder, public bookService: BookService) {}
  ngOnInit(): void {
    this.bookForm = this.fbBook.group({
      amazon_product_url: [''],
      author: ['', [Validators.required]],
      book_image: [''],  
      description: [''],
      publisher: [''],
      title: ['', [Validators.required]],
    });
  }
}

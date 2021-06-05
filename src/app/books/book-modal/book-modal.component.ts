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

  constructor(private fb: FormBuilder, public bookService: BookService) {}
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      createdTime: [''],
      fields: {
        amazon_product_url: [''],
        author: [''],
        book_image: [''],
        contributor: [''],
        description: [''],
        id: [''],
        price: [''],
        publisher: [''],
        title: [''],
      },
      id: [''],
      // phone: ['', [Validators.required, Validators.maxLength(20)]],
      // email: ['', [Validators.email, Validators.maxLength(50)]],
    });
  }
}

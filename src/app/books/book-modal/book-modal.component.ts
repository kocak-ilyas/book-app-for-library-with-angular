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
      amazon_product_url: ['x', [Validators.required]],
      author: ['x', [Validators.required]],
      book_image: ['x', [Validators.required]],
      contributor: ['x', [Validators.required]],
      description: ['x', [Validators.required]],
      price: [0, [Validators.required]],
      publisher: ['x', [Validators.required]],
      title: ['x', [Validators.required]],
    });
  }
}

// phone: ['', [Validators.required, Validators.maxLength(20)]],
// email: ['', [Validators.email, Validators.maxLength(50)]],

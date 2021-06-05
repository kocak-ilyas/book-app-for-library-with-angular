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
        amazon_product_url: ['', [Validators.required, Validators.maxLength(20)]],
        author: ['', [Validators.required, Validators.maxLength(20)]],
        book_image: ['', [Validators.required, Validators.maxLength(20)]],
        contributor: ['', [Validators.required, Validators.maxLength(20)]],
        description: ['', [Validators.required, Validators.maxLength(20)]],
        id: [''],
        price: ['', [Validators.required, Validators.maxLength(20)]],
        publisher: ['', [Validators.required, Validators.maxLength(20)]],
        title:['', [Validators.required, Validators.maxLength(20)]]     
      });
    }
  }
  
  // phone: ['', [Validators.required, Validators.maxLength(20)]],
  // email: ['', [Validators.email, Validators.maxLength(50)]],
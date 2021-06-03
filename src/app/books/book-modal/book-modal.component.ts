import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css'],
})
export class BookModalComponent implements OnInit {
  @Output() newDialogEvent = new EventEmitter<string>();

  bookForm!: FormGroup;
  constructor(private fb: FormBuilder, public bookService: BookService) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      name: ['', Validators.maxLength(50)],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      address: ['', Validators.maxLength(255)],
    });
  }
  addBook(): void {
    try {
      this.bookService.postBook(this.bookForm.value)
    } catch (error) {
      console.log(error);
    }
  }
}

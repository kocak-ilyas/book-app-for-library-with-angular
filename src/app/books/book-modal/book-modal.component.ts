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
  constructor(private fb: FormBuilder, private bookService: BookService) {}

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
    console.log(this.bookForm.value);
    this.bookService.addBook(this.bookForm.value).subscribe((res: any) => {
      console.log(res);
    });
  }
}

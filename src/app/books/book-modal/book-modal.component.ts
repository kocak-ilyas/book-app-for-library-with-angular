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
      name: ['', Validators.maxLength(50)],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      address: ['', Validators.maxLength(255)],
    });
  }
}
// import { Component, Inject, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Book } from 'src/app/models/book';
// import { BookService } from 'src/app/services/book.service';
// import { BookItemComponent } from '../book-item/book-item.component';

// @Component({
//   selector: 'app-book-modal',
//   templateUrl: './book-modal.component.html',
//   styleUrls: ['./book-modal.component.css'],
// })
// export class BookModalComponent implements OnInit {
//   bookForm!: FormGroup;

//   constructor(private fb: FormBuilder, public bookService: BookService,
//     @Inject(BookItemComponent) public data:Book) {}
//   ngOnInit(): void {
//     console.log(this.data)
//     this.bookForm = this.fb.group({
//       name: [ this.data.name || '', Validators.maxLength(50)],
//       title: [this.data.title || '',  [Validators.required, Validators.maxLength(255)]],
//       phone: [this.data.phone || '', [Validators.required, Validators.maxLength(20)]],
//       email: [this.data.email || '',  [Validators.email, Validators.maxLength(50)]],
//       address: [this.data.address || '',  Validators.maxLength(255)],
//     });
//   }
// }

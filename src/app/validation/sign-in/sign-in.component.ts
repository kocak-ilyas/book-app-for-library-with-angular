import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signForm!: FormGroup;

  constructor(
    private fbBook: FormBuilder,
    public bookService: BookService
  ) {}

  ngOnInit(): void {
    this.signForm = this.fbBook.group({
      email: ['', [Validators.email,Validators.required]],
      password: ['']
    });
  }
}

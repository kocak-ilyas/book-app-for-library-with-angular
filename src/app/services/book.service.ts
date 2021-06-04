import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl = 'https://demo.limantech.com/cards/public/api';
  books!: Book[];
  dialog = { show: false, message: 'No message!!!', spin: false };

  constructor(private http: HttpClient) {}

  getDialogModal(): void {
    (this.dialog.show = true),
      window.setTimeout(() => {
        this.dialog.show = false;
      }, 5000);
  }
  getError(err: string) {
    this.dialog.message = err;
    this.getDialogModal();
  }
  getBooks(): void {
    this.dialog.spin = true;
    this.http.get<Book[]>(this.apiUrl + '/cards').subscribe(
      (res: Book[]) => {
        this.books = res;
        this.dialog.spin = false;
      },
      (err: any) => this.getError(err.message)
    );
  }

  postBook(book: Book): void {
    this.http.post(this.apiUrl + '/cards', book).subscribe(
      (res: any) => {
        this.dialog.message = res || 'book added!!!';
      },
      (err: any) => this.getError(err.message)
    );
    this.getDialogModal();
    this.getBooks();
  }

  deleteBook(book: any): void {
    this.http.delete(this.apiUrl + '/cards/' + book.id).subscribe(
      (res: any) => {
        this.dialog.message = res || 'book deleted!!!';
      },
      (err: any) => this.getError(err.message)
    );
    this.getDialogModal();
    this.getBooks();
  }
}

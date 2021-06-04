import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl = 'https://demo.limantech.com/cards/public/api';
  books!: Book[];
  dialog = { show: false, message: 'No message!!!', spin: false };
  // data: any;
  constructor(
    // @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}
  // editBook(book: Book): void {
  //   this.data = book;
  //   console.log('editBook :>> ', this.data);
  // }
  getBooks(): void {
    this.dialog.spin = true;
    this.http.get<Book[]>(this.apiUrl + '/cards').subscribe((res: Book[]) => {
      this.books = res;
      this.dialog.spin = false;
    });
  }
  postBook(book: Book): void {
    this.http.post(this.apiUrl + '/cards', book).subscribe((res: any) => {
      this.dialog.message = res || 'book added!!!';
    });
    (this.dialog.show = true),
      window.setTimeout(() => {
        this.dialog.show = false;
      }, 5000);
    this.getBooks();
  }

  // çalışmıyor
  // updateBook(book: Book): void {
  //   console.log('updateBook', book);
  //   this.http
  //     .put(this.apiUrl + '/cards/' + book.id, book)
  //     .subscribe((res: any) => {
  //       this.dialog.message = res || 'book updated!!!';
  //     });
  //   (this.dialog.show = true),
  //     window.setTimeout(() => {
  //       this.dialog.show = false;
  //     }, 5000);
  //   this.getBooks();
  // }

  deleteBook(book: any): void {
    this.http
      .delete(this.apiUrl + '/cards/' + book.id)
      .subscribe((res: any) => {
        this.dialog.message = res || 'book deleted!!!';
      });
    (this.dialog.show = true),
      window.setTimeout(() => {
        this.dialog.show = false;
      }, 5000);
    this.getBooks();
  }
}

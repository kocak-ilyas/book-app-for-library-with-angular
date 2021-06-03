import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books!: Book[];
  dialog = { show: false, message: 'No message!!!' };
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getBooks(): void {
    this.http.get<Book[]>(this.apiUrl + '/cards').subscribe((res: Book[]) => {
      this.books = res;
    });
  }
  postBook(book: Book): void {
    this.http.post(this.apiUrl + '/cards', book).subscribe((res: any) => {
      this.dialog = {
        message: res || 'book added!!!',
        show: true,
      };
      window.setTimeout(() => {
        this.dialog.show = false;
      }, 5000);
      this.getBooks();
    });
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl = 'https://api.airtable.com/v0/appQFrxkao1iyURGH/Books?maxRecords=3&view=Main%20View';
  books!: Book[];
  filteredBook: Book[] = [];
  dialog = { show: false, message: 'No message!!!', spin: false };

  constructor(private http: HttpClient) {}

  getBooks(): void {
    this.dialog.spin = true;
    this.http.get(this.apiUrl,{headers: new HttpHeaders({ Authorization: 'Bearer keyzGIxPsAuiGk5mE' })})
      .subscribe(
        (res: any) => { console.log(res);
          // this.books = res;
          // this.filteredBook = res;
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

  }
  deleteBook(book: any): void {
    this.http.delete(this.apiUrl + '/cards/' + book.id).subscribe(
      (res: any) => {
        this.dialog.message = res || 'book deleted!!!';
      },
      (err: any) => this.getError(err.message)
    );
    this.getDialogModal();
  }

  getDialogModal(): void {
    (this.dialog.show = true),
      window.setTimeout(() => {
        this.dialog.show = false;
        this.getBooks();
      }, 2000);
  }
  getError(err: string): void {
    this.dialog.message = err;
    this.getDialogModal();
  }
  searchBook(searchText: string): void {
    searchText = searchText.toLowerCase();
    this.filteredBook = this.books.filter((book: Book) => {
      return (
        book.title.toLowerCase().indexOf(searchText) > -1 ||
        (book.name && book.name.toLowerCase().indexOf(searchText) > -1)
      );
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiBase = 'appQFrxkao1iyURGH';
  apiTable = 'books-list';
  apiKey = 'keyzGIxPsAuiGk5mE';

  // authHeader = {
  //   headers: new HttpHeaders({
  //     Authorization: `Bearer ${this.apiKey}`,
  //     'Content-Type': 'application/json',
  //   }),
  // };
  authHeader = { headers: { Authorization: `Bearer ${this.apiKey}` } };
  apiUrl = `https://api.airtable.com/v0/${this.apiBase}/${this.apiTable}`;

  books!: Book[];
  filteredBook: Book[] = [];
  dialog = { show: false, message: 'wait please', spin: false };
  postedBook: any;

  constructor(private http: HttpClient) {}

  getBooks(): void {
    this.dialog.spin = true;
    this.http;
    this.http
      .get(
        this.apiUrl +
          '?maxRecords=100&view=Grid%20view&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=desc',
        this.authHeader
      )
      .subscribe(
        (res: any) => {
          this.books = res.records;
          this.filteredBook = res.records;
          this.dialog.spin = false;
        },
        (err: any) => this.getError(err.message)
      );
  }
  postBook(fields: Book): void {
    this.postedBook = { fields };
    this.http.post(this.apiUrl, this.postedBook, this.authHeader).subscribe(
      (res: any) => {
        res.fields.title
          ? (this.dialog.message = res.fields.title + ' added!!!')
          : (this.dialog.message = 'book added!!!');
      },
      (err: any) => this.getError(err)
    );
    this.getDialogModal();
  }
  deleteBook(book: any): void {
    this.http.delete(this.apiUrl + '/' + book.id, this.authHeader).subscribe(
      (res: any) => {
        res.deleted
          ? (this.dialog.message = 'Book DELETED!!!')
          : (this.dialog.message = 'There is a problem deleting');
      },
      (err: any) => this.getError(err)
    );
    this.getDialogModal();
  }

  getDialogModal(): void {
    (this.dialog.show = true),
      this.getBooks(),
      window.setTimeout(() => {
        this.dialog.show = false;
        this.dialog.message = '';
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
        (book.fields &&
          book.fields.title.toLowerCase().indexOf(searchText) > -1) ||
        (book.fields &&
          book.fields.author.toLowerCase().indexOf(searchText) > -1) ||
        (book.fields &&
          book.fields.author.toLowerCase().indexOf(searchText) > -1) ||
        (book.fields &&
          book.fields.author.toLowerCase().indexOf(searchText) > -1)
      );
    });
  }
}

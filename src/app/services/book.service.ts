import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, Sign } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiKey = 'keyzGIxPsAuiGk5mE'
  apiBase = 'appQFrxkao1iyURGH'
  bookTable = 'books-list';
  userTable = 'users';
  apiUrl = `https://api.airtable.com/v0/${this.apiBase}/`;

  books!: Book[];
  filteredBook: Book[] = [];
  dialog = { show: false, message: 'wait please', spin: false };
  validation = true;

  constructor(private http: HttpClient) {}

  getBooks(): void {
    this.dialog.spin = true;
    this.http
      .get(
        this.apiUrl +
          this.bookTable +
          `?api_key=${this.apiKey}` +
          '&maxRecords=100&view=Grid%20view&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=desc'
      )
      .subscribe(
        (res: any) => {
          this.books = res.records;
          this.filteredBook = res.records;
          this.dialog.spin = false;
        },
        (err: any) => this.getError(err)
      );
  }
  postBook(fields: Book): void {
    this.http
      .post(this.apiUrl + this.bookTable + `?api_key=${this.apiKey}`, {
        fields,
      })
      .subscribe(
        (res: any) => {
          res.fields.title
            ? (this.dialog.message = res.fields.title + ' adding...')
            : (this.dialog.message = 'book added!!!');
        },
        (err: any) => this.getError(err)
      );
    this.getDialogModal();
  }
  deleteBook(book: any): void {
    console.log(
      this.apiUrl + this.bookTable + '/' + book.id + `?api_key=${this.apiKey}`
    );
    this.http
      .delete(
        this.apiUrl + this.bookTable + '/' + book.id + `?api_key=${this.apiKey}`
      )
      .subscribe(
        (res: any) => {
          res.deleted
            ? (this.dialog.message = 'Book deleting...')
            : (this.dialog.message = 'There is a problem deleting');
        },
        (err: any) => this.getError(err)
      );
    this.getDialogModal();
  }

  queryEmail(value: Sign): void {
    this.http
      .get(
        this.apiUrl +
          this.userTable +
          `?api_key=${this.apiKey}` +
          `&fields%5B%5D=email&filterByFormula=SEARCH(%7Bemail%7D%2C%22${value.email}%22)`
      )
      .subscribe((res: any) => {
        res.records.length === 1
          ? this.queryPassword(value)
          : ((this.dialog.message = 'Username is wrong!!!'),
            this.getDialogModal());
      });
  }
  queryPassword(value: Sign): void {
    try {
      this.http
        .get(
          this.apiUrl +
            this.userTable +
            `?api_key=${this.apiKey}` +
            `&filterByFormula=AND(SEARCH(%7Bemail%7D%2C%22${value.email}%22)%2CSEARCH(%7Bpassword%7D%2C%22${value.password}%22))`
        )
        .subscribe((res: any) => {
          res.records.length === 1
            ? ((this.dialog.message = 'Welcome ' + res.records[0].fields.email),
              this.getDialogModal(),
              (this.validation = false))
            : ((this.dialog.message = 'Password is wrong!!!'),
              this.getDialogModal());
        });
    } catch (error) {
      console.log(error);
    }
  }

  getDialogModal(): void {
    this.dialog.show = true;
    window.setTimeout(() => {
      this.dialog.show = false;
      this.dialog.message = '';
      this.getBooks();
    }, 2000);
  }
  getError(err: string): void {
    console.log(err);
    this.getDialogModal();
  }
  searchBook(searchText: string): void {
    searchText = searchText.toLowerCase();
    this.filteredBook = this.books.filter((book: Book) => {
      return (
        (book.fields &&
          book.fields.title.toLowerCase().indexOf(searchText) > -1) ||
        (book.fields &&
          book.fields.author.toLowerCase().indexOf(searchText) > -1)
      );
    });
  }
}

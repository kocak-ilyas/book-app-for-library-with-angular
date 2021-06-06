import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  tempEmail: string = '';
  tempPassword: string = '';
  apiBase = 'appQFrxkao1iyURGH';
  bookTable = 'books-list';
  userTable = 'users';

  apiKey = 'keyzGIxPsAuiGk5mE';
  apiUrl = `https://api.airtable.com/v0/${this.apiBase}/`;

  books!: Book[];
  filteredBook: Book[] = [];
  dialog = { show: false, message: 'wait please', spin: false };
  postedBook: any;

  constructor(private http: HttpClient) {}
  queryEmail(): void {
    this.tempEmail = 'admin@admin.com';
    this.http
      .get(
        this.apiUrl +
          this.userTable +
          `?api_key=${this.apiKey}` +
          `&fields%5B%5D=email&filterByFormula=SEARCH(%7Bemail%7D%2C%22${this.tempEmail}%22)`
      )
      .subscribe((res: any) => {
        res.records.length === 1
          ? this.queryPassword()
          : console.log('Please Sign Up!!!');
      });
  }
  queryPassword(): void {
    this.tempPassword = 'admin';
    try {
      this.http
        .get(
          this.apiUrl +
            this.userTable +
            `?api_key=${this.apiKey}` +
            `&filterByFormula=AND(SEARCH(%7Bemail%7D%2C%22${this.tempEmail}%22)%2CSEARCH(%7Bpassword%7D%2C%22${this.tempPassword}%22))`
        )
        .subscribe((res: any) => {
          res
            ? console.log('email tamam,password tamam',res)
            : console.log('email tamam,password yanlış');
        });
    } catch (error) {
      console.log(error);
    }
  }
  getBooks(): void {
    this.queryEmail();//changeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
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
    this.postedBook = { fields };
    this.http
      .post(
        this.apiUrl + this.bookTable + `?api_key=${this.apiKey}`,
        this.postedBook
      )
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

// authHeader = {
//   headers: new HttpHeaders({
//     Authorization: `Bearer ${this.apiKey}`,
//     'Content-Type': 'application/json',
//   }),
// };
// apiUrlWithKey="https://api.airtable.com/v0/appQFrxkao1iyURGH/books-list?api_key=keyzGIxPsAuiGk5mE"

// userData = {
//   queryUrl:
//     'https://api.airtable.com/v0/appQFrxkao1iyURGH/books-list?api_key=keyzGIxPsAuiGk5mE&fields%5B%5D=title&filterByFormula=SEARCH(%7Btitle%7D%2C%22xxx%22)%3E0',
// };
// tempId: string = 'rec7miGgEggZzMoe1';
// authHeader = { headers: { Authorization: `Bearer ${this.apiKey}` } };
// bookApiUrl = `https://api.airtable.com/v0/${this.apiBase}/${this.bookTable}?api_key=${this.apiKey}`;
// userApiUrl = `https://api.airtable.com/v0/${this.apiBase}/${this.userTable}?api_key=${this.apiKey}`;

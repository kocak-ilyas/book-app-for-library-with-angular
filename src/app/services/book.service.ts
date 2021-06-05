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

  authHeader = {
    headers: new HttpHeaders({ Authorization: `Bearer ${this.apiKey}` }),
  };
  apiUrl = `https://api.airtable.com/v0/${this.apiBase}/${this.apiTable}?`;
  books!: Book[];
  filteredBook: Book[] = [];
  dialog = { show: false, message: 'No message!!!', spin: false };

  constructor(private http: HttpClient) {}

  getBooks(): void {
    this.dialog.spin = true;
    this.http;
    this.http.get(this.apiUrl, this.authHeader).subscribe(
      (res: any) => {
        console.log(res.records)
        this.books = res.records;
        this.filteredBook = res.records;
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

// "author" column filter:
// https://api.airtable.com/v0/appQFrxkao1iyURGH/books-list?fields%5B%5D=author

// "author" and “name” column filter:
// https://api.airtable.com/v0/appQFrxkao1iyURGH/books-list?fields%5B%5D=author&fields%5B%5D=name

// add sorting to author column "desc" (opposite of "asc")
// https://api.airtable.com/v0/appQFrxkao1iyURGH/books-list?fields%5B%5D=author&sort%5B0%5D%5Bfield%5D=author&sort%5B0%5D%5Bdirection%5D=desc

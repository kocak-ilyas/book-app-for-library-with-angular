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
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    }),
  };
  apiUrl = `https://api.airtable.com/v0/${this.apiBase}/${this.apiTable}`;
  books!: Book[];
  filteredBook: Book[] = [];
  dialog = { show: false, message: '...', spin: false };

  tempHead: any;
  xxx = {
    fields: {
      publisher: '2xxx',
      description: '2xxx',
      price: 999,
      title: '2xxx',
      author: '2xxx',
      contributor: '1xxx',
      book_image:
        'https://storage.googleapis.com/du-prd/books/images/9780385547680.jpg',
      amazon_product_url:
        'https://www.amazon.com/dp/0385547684?tag=NYTBSREV-20',
    },
  };
  constructor(private http: HttpClient) { }

  getBooks(): void {
    this.dialog.spin = true;
    this.http;
    this.http
      .get(
        this.apiUrl +
        '?maxRecords=8&view=Grid%20view&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=desc',
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
    this.tempHead = { fields };
    console.log(this.tempHead);
    this.http
      .post(this.apiUrl, this.xxx, this.authHeader)
      .subscribe((res: any) => {
        console.log(res);
      });
    // this.http.post(this.apiUrl, book).subscribe(
    //   (res: any) => {
    //     this.dialog.message = res || 'book added!!!';
    //   },
    //   (err: any) => this.getError(err.message)
    // );
    // this.getDialogModal();
  }
  deleteBook(book: any): void {
    this.http.delete(this.apiUrl + '/' + book.id, this.authHeader).subscribe(
      (res: any) => {
        res.deleted ? (this.dialog.message = 'Book DELETED!!!') : null;
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

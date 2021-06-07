export interface Book {
  fields?: {
    amazon_product_url: string;
    author: string;
    book_image: string;
    description: string;
    publisher: string;
    title: string;
  };
  id?: string;
}
export interface Sign {
 email?:string,
 password?:string,
}

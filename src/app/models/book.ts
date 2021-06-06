export interface Book {
  createdTime?: string;
  fields?: {
    amazon_product_url: string;
    author: string;
    book_image: string;
    contributor: string;
    description: string;
    id: number;
    // price: number;
    publisher: string;
    title: string;
  };
  id?: string;
}

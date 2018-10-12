export interface Product {
  product_id:number;
  product_image_id:string;
  product_name:string;
  product_price:number;
  product_description:string;
  quantityInCart: number;
  addButtonState: string;
}
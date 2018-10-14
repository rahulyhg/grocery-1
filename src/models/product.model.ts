export interface Product {
  id:number;
  product_image:string;
  product_name:string;
  product_price:number;
  product_description:string;
  quantityInCart: number;
  addButtonState: string;
  product_tags:string;
  product_manufacturer:string;
  product_sku:number;
  total_qty:number;
}
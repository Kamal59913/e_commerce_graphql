export interface FormValues {
  product_name: string;
  product_description: string;
  stock_quantity: number;
  product_price: number;
  currency: string;
  isActive: boolean;
  product_images?: ProductImage[];
};

interface ProductImage {
  displayName: string;
  url: string;
  publicId: string;
}

export interface FormValues {
  product_name: string;
  product_description?: string;
  stock_quantity: number;
  product_price: number;
  currency: string;
  isActive: boolean;
  product_images?: ProductImage[];
  weight?: number;
  dimensions?: string;
  material?: string;
  model_number?: string;
  warranty?: string;
  more_details? : MoreDetails[];
}
interface ProductImage {
  displayName: string;
  url: string;
  publicId: string;
}

interface MoreDetails {
  key: string;
  value: string;
}
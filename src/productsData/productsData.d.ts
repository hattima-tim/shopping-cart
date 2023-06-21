export interface Product {
  path?:string;
  breadCrumbs: Array<{ name: string; path: string }>;
  pathName?: string;
  fullPath: string;
  imagesForProductPage: string[];
  imgForProductCard?: string;
  name: string;
  price: string;
  details: string[];
  fabric: string[];
  color: string[];
  size: string[];
  description: string[];
  additionalInfo: {
    weight: string;
    fabric?: string;
    size: string;
  };
}
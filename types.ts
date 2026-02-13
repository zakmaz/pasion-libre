
export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  seller: string;
  isVerified: boolean;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export enum AppRoute {
  HOME = 'home',
  LISTING = 'listing',
  CREATE = 'create',
  DETAIL = 'detail'
}

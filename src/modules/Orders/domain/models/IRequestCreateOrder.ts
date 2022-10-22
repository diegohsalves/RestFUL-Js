import { IProduct } from '@modules/Products/domain/models/IProduct';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}

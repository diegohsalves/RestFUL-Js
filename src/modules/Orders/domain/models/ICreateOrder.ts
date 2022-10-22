import { ICustomer } from "@modules/Customers/domain/models/ICustomer";
import { ICreateOrderProducts } from "./ICreateOrderProducts";


export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}

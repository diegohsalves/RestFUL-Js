import { ICustomersRepository } from '@modules/Customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/Customers/infra/typeorm/repositories/CustomersRepository';
import { IOrdersRepository } from '@modules/Orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '@modules/Orders/infra/typeorm/repositories/OrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/Products/infra/typeorm/repositories/ProductsRepository';
import { IUsersRepository } from '@modules/Users/domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/Users/domain/repositories/IUserTokensRepository';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/Users/infra/typeorm/repositories/UserTokensRepository';
import { container } from 'tsyringe';
import '@modules/Users/providers';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

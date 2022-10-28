import 'reflect-metadata';
import FakeCustomersRepository from '@modules/Customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/infra/http/errors/AppError';
import ListCustomerService from '../ListCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomer: ListCustomerService;

describe('ListCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustomer = new ListCustomerService(fakeCustomersRepository);
  })

  it('Should be able to list the Customers', async() => {
      const customer = await listCustomer.execute();

    expect(customer).toReturn;
  });

});

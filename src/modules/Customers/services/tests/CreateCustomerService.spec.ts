import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomersRepository from '@modules/Customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/infra/http/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  })

  it('Should be able to create a new Customer', async() => {
      const customer = await createCustomer.execute({
      name: 'São Lucas',
      email: 'teste@teste.com',

    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create two Customers with the same email', async() => {
      const customer = await createCustomer.execute({
      name: 'São Lucas',
      email: 'teste@teste.com',

    });

    expect(
      createCustomer.execute({
        name: 'São Lucas',
        email: 'teste@teste.com'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

});

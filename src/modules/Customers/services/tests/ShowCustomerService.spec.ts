import 'reflect-metadata';
import FakeCustomersRepository from '@modules/Customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/infra/http/errors/AppError';
import ShowCustomerService from '../ShowCustomerService';
import Customer from '@modules/Customers/infra/typeorm/entities/Customer';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomer: ShowCustomerService;

describe('ShowCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  })

  it('Should be able to show a Customer', async() => {
      const customer = await fakeCustomersRepository.create({
      name: 'São Lucas',
      email: 'teste@teste.com',
    });

    const foundCustomer = await showCustomer.execute(customer);

    expect(foundCustomer).toEqual(customer);

  });

  it('Should not be able to show a Customer', async() => {
    const customer = new Customer();

    customer.id = '3000';
    customer.name = 'Fulano';
    customer.email = 'fulano@teste.com';

  expect(
    showCustomer.execute(customer)).rejects.toBeInstanceOf(AppError);

  });

});

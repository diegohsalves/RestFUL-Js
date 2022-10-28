import 'reflect-metadata';
import FakeCustomersRepository from '@modules/Customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/infra/http/errors/AppError';
import UpdateCustomerService from '../UpdateCustomerService';
import Customer from '@modules/Customers/infra/typeorm/entities/Customer';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
  })

  it('Should be able to update a Customer', async() => {
      const customer = await fakeCustomersRepository.create({
      name: 'São Lucas',
      email: 'teste@teste.com',
    });

    const updatedCustomer = new Customer();

    updatedCustomer.id = customer.id;
    updatedCustomer.name = "Tião";
    updatedCustomer.email = "tiao@teste.com";

    updateCustomer.execute(updatedCustomer);

    expect(fakeCustomersRepository.findById(updatedCustomer.id)).not.toEqual(customer);

  });

  it('Should not not be able to update a not found Customer', async() => {

    const updatedCustomer = new Customer();

    updatedCustomer.id = '2000';
    updatedCustomer.name = "Tião";
    updatedCustomer.email = "tiao@teste.com";

    expect(
      updateCustomer.execute(updatedCustomer)).rejects.toBeInstanceOf(AppError);

  });

  it('Should not not be able to update a Customer if the new email sent is already in use by another Customer', async() => {
    const customer1 = await fakeCustomersRepository.create({
      name: 'São Lucas',
      email: 'teste@teste.com',
    });

    const customer2 = await fakeCustomersRepository.create({
      name: 'Tião',
      email: 'tiao@teste.com',
    });

    const updatedCustomer = new Customer();
    updatedCustomer.id = customer1.id;
    updatedCustomer.name = customer1.name;
    updatedCustomer.email = customer2.email;

    expect(
      updateCustomer.execute(updatedCustomer)).rejects.toBeInstanceOf(AppError);

  });

});

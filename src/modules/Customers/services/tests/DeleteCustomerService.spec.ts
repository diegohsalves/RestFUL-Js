import 'reflect-metadata';
import FakeCustomersRepository from '@modules/Customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/infra/http/errors/AppError';
import DeleteCustomerService from '../DeleteCustomerService';
import Customer from '@modules/Customers/infra/typeorm/entities/Customer';
import ShowCustomerService from '../ShowCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomerService;
let showCustomer: ShowCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  })

  it('Should be able to delete a Customer', async() => {
      const customer = await fakeCustomersRepository.create({
        name: 'São Lucas',
        email: 'teste@teste.com',
      });

      expect(
        deleteCustomer.execute(customer)
      ).toHaveReturned

  });

  it('Should not be able to delete a not found Customer', async() => {
    const customer = new Customer();

    customer.id = '3000';
    customer.name = 'Fulano';
    customer.email = 'fulano@teste.com';

    expect(
      deleteCustomer.execute(customer)
    ).rejects.toBeInstanceOf(AppError);

    });

});

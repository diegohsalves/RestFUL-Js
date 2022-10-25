import 'reflect-metadata';
import AppError from '@shared/infra/http/errors/AppError';
import FakeUsersRepository from '@modules/Users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '@modules/Users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to create a new User', async() => {
      const user = await createUser.execute({
      name: 'São Lucas',
      email: 'teste@teste.com',
      password: '123456'

    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create two Users with the same email', async() => {
      await createUser.execute({
      name: 'São Lucas',
      email: 'teste@teste.com',
      password: '123456'

    });

    expect(
      createUser.execute({
        name: 'São Lucas',
        email: 'teste@teste.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

});

import 'reflect-metadata';
import AppError from '@shared/infra/http/errors/AppError';
import FakeUsersRepository from '@modules/Users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/Users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from '../CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createSession = new CreateSessionsService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to authenticate', async() => {
      const user = await fakeUsersRepository.create({
      name: 'São Lucas',
      email: 'teste@teste.com',
      password: '123456'
    });

    const response = await createSession.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existent user', async() => {
    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('Should not be able to authenticate with wrong password', async() => {
    const user = await fakeUsersRepository.create({
    name: 'São Lucas',
    email: 'teste@teste.com',
    password: '123456'
  });

  expect(
    createSession.execute({
      email: 'teste@teste.com',
      password: '567890'
    })
  ).rejects.toBeInstanceOf(AppError);

 });

});

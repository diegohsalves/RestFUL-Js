import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import AppError from '@shared/infra/http/errors/AppError';
import FakeUsersRepository from '@modules/Users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/Users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from '../ResetPasswordService';
import FakeUserTokensRepository from '@modules/Users/domain/repositories/fakes/FakeUserTokensRepository';
import { addDays, addHours, subDays, subHours } from 'date-fns';
import UserToken from '@modules/Users/infra/typeorm/entities/UserToken';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;


describe('ResetPassword', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });

  it('Should be able to reset the password', async() => {
      const user = await fakeUsersRepository.create({
      name: 'São Lucas',
      email: 'teste@teste.com',
      password: '123456'
    });

    const originalUser = user;

    const userToken = await fakeUserTokensRepository.generate(user.id);
    const token = userToken.token;
    const password = "000000";

    resetPassword.execute({token, password});

    const passChangedUser = fakeUsersRepository.findById(userToken.user_id);

    expect(passChangedUser).not.toEqual(originalUser);

    });

  it('Should not be able to reset the password with a non existent UserToken', async() => {

    const token = "Wrong Token";
    const password = "000000";

    expect(resetPassword.execute({token, password})).rejects.toBeInstanceOf(AppError);

  });

  it('Should not be able to reset the password of a non existent User', async() => {

    const fakeId = "3030"

    const userToken = await fakeUserTokensRepository.generate(fakeId);
    const token = userToken.token;
    const password = "000000";

    expect(resetPassword.execute({token, password})).rejects.toBeInstanceOf(AppError);

  });

  // it('Should not be able to reset the password with an expired Token', async() => {

  //   const user = await fakeUsersRepository.create({
  //     name: 'São Lucas',
  //     email: 'teste@teste.com',
  //     password: '123456'
  //   });

  //   const expiredDate = subHours(Date.now(), 72);

  //   const userToken = new UserToken();
  //   userToken.id = uuidv4();
  //   userToken.token = uuidv4();
  //   userToken.user_id = user.id;
  //   userToken.created_at = expiredDate;
  //   userToken.updated_at = addDays(Date.now(), 2);

  //   const password = "000000";
  //   const token = userToken.token;

  //   expect(resetPassword.execute({token, password})).rejects.toBeInstanceOf(AppError);

  // });

});

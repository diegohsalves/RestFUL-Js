import 'reflect-metadata';
import FakeUsersRepository from '@modules/Users/domain/repositories/fakes/FakeUsersRepository';
import ListUserService from '../ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUser: ListUserService;

describe('ListUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUser = new ListUserService(fakeUsersRepository);
  });

  it('Should be able to return a list of Users', async() => {
      const users = await listUser.execute();

    expect(users).toReturn
  });

});

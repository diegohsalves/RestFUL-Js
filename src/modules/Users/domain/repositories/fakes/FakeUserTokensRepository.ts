import { IUserTokensRepository } from '@modules/Users/domain/repositories/IUserTokensRepository';
import UserToken from '@modules/Users/infra/typeorm/entities/UserToken';
import { v4 as uuidv4 } from 'uuid';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(userToken => userToken.token == token);
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.id = uuidv4();
    userToken.user_id = user_id;
    userToken.token = uuidv4();

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;

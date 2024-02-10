import { compare } from 'bcrypt';
import { IUsersRepository } from '../repositories/user-repository';
import { AppError } from '@shared/errors/app-error';
import { AUTH_ERRORS } from '@shared/errors/enums';
import { User } from '@prisma/client';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';

interface IAuthenticateUserRequest {
  email: string
  password: string
}

interface IAuthenticateUserResponse {
  user: User
  token: string
}

class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(AUTH_ERRORS['user-not-found'], 404)
    }

    const hasCorrectCredentials = await compare(user.password, password);

    if(!hasCorrectCredentials) {
      throw new AppError(AUTH_ERRORS['invalid-credentials'])
    }

    const { secret_token, expires_in_token } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    return { 
      user, 
      token
    }
  }
}

export { AuthenticateUserService };

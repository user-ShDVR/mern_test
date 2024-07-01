import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/utils/password/password.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  async signUp(
    email: string,
    password: string,
    surname: string,
    name: string,
    lastname: string,
  ) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new UnauthorizedException('Почта занята.');
    }

    const salt = await this.passwordService.getSalt();
    const hash = await this.passwordService.getHash(password, salt);

    const newUser = await this.usersService.create({
      email,
      hash,
      salt,
      surname,
      name,
      lastname,
    });

    const token = await this.jwtService.signAsync({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      token,
      user: { ...newUser, hash: null, salt: null, deleted: null },
    };
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Почта или пароль указаны неверно..');
    }

    const hash = await this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException('Почта или пароль указаны неверно..');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { token, user: { ...user, hash: null, salt: null, deleted: null } };
  }

  async getSesssionInfo(id: number) {
    const user = await this.usersService.findOne(id);
    return user;
  }
}

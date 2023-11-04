import { ApiTags, PickType } from '@nestjs/swagger';
import { User } from '../../../../infra/entities';

export class LoginUserDto extends PickType(User, ['email', 'password']) {} //User의 객체 중 이메일, 패스워드 가져오기
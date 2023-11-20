import { ResponsePostDto } from '../../../post';
import { ApiProperty } from '@nestjs/swagger';
import { FamilyMember } from '../../../../infra/entities';

export class ResponseFamilyMemberDto {
  @ApiProperty({ example: 1, description: '가족 멤버 고유 ID' })
  readonly familyMemberId: number;

  @ApiProperty({ example: 1, description: '가족 고유 ID' })
  readonly familyId: number;

  @ApiProperty({ example: 1, description: '유저 고유 ID' })
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: '가족 멤버의 역할, (1: 부, 2: 모, 3: 아들, 4: 딸)',
  })
  readonly role: number;

  @ApiProperty({ example: 1, description: '가족 멤버의 총 찌르기 횟수' })
  readonly pokeCount: number;

  @ApiProperty({ example: 1, description: '가족 멤버의 총 대화 횟수' })
  readonly talkCount: number;

  private constructor(
    familyMemberId: number,
    familyId: number,
    userId: number,
    role: number,
    pokeCount: number,
    talkCount: number,
  ) {
    this.familyMemberId = familyMemberId;
    this.familyId = familyId;
    this.userId = userId;
    this.role = role;
    this.pokeCount = pokeCount;
    this.talkCount = talkCount;
  }

  static of(
    familyMemberId: number,
    familyId: number,
    userId: number,
    role: number,
    pokeCount: number,
    talkCount: number,
  ): ResponseFamilyMemberDto {
    return new ResponseFamilyMemberDto(
      familyMemberId,
      familyId,
      userId,
      role,
      pokeCount,
      talkCount,
    );
  }

  static from(familyMember: FamilyMember): ResponseFamilyMemberDto {
    return new ResponseFamilyMemberDto(
      familyMember.id,
      familyMember.family.id,
      familyMember.user.id,
      familyMember.role,
      familyMember.pokeCount,
      familyMember.talkCount,
    );
  }
}

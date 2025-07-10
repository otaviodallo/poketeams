import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiProperty({
    description: 'ID único do time',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do time',
    example: 'Time dos Iniciais',
  })
  name: string;

  @ApiProperty({
    description: 'ID do treinador dono do time',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  trainerId: string;

  @ApiProperty({
    description: 'Data de criação do time',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do time',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

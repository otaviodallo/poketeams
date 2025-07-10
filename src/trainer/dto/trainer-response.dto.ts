import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrainerResponseDto {
  @ApiProperty({
    description: 'ID único do treinador',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do treinador',
    example: 'Ash Ketchum',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Cidade de origem do treinador',
    example: 'Pallet Town',
  })
  city?: string;

  @ApiProperty({
    description: 'Data de criação do treinador',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do treinador',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

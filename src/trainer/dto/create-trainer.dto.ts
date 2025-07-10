import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrainerDto {
  @ApiProperty({
    description: 'Nome do treinador',
    example: 'Ash Ketchum',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Cidade de origem do treinador',
    example: 'Pallet Town',
  })
  @IsString()
  @IsOptional()
  city?: string;
}

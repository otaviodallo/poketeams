import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrainerDto {
  @ApiPropertyOptional({
    description: 'Nome do treinador',
    example: 'Ash Ketchum',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    description: 'Cidade de origem do treinador',
    example: 'Pallet Town',
  })
  @IsString()
  @IsOptional()
  city?: string;
}

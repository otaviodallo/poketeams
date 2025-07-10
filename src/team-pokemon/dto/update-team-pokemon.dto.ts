import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeamPokemonDto {
  @ApiPropertyOptional({
    description: 'ID do time',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  teamId?: string;

  @ApiPropertyOptional({
    description: 'ID ou nome do Pokémon na PokéAPI',
    example: 'pikachu',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  pokemonId?: string;
}

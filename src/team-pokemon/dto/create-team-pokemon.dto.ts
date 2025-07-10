import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamPokemonDto {
  @ApiProperty({
    description: 'ID do time',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty({
    description: 'ID ou nome do Pokémon na PokéAPI',
    example: 'pikachu',
  })
  @IsString()
  @IsNotEmpty()
  pokemonId: string;
}

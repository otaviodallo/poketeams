import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddPokemonDto {
  @ApiProperty({
    description: 'ID ou nome do Pokémon na PokéAPI',
    example: 'pikachu',
  })
  @IsString()
  @IsNotEmpty()
  pokemonId: string;
}

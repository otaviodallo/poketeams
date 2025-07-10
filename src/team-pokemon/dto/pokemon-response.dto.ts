import { ApiProperty } from '@nestjs/swagger';

export class PokemonResponseDto {
  @ApiProperty({
    description: 'ID único do Pokémon no time',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID ou nome do Pokémon na PokéAPI',
    example: 'pikachu',
  })
  pokemonId: string;

  @ApiProperty({
    description: 'Nome do Pokémon',
    example: 'Pikachu',
  })
  name: string;

  @ApiProperty({
    description: 'Tipos do Pokémon',
    example: ['electric'],
  })
  types: string[];

  @ApiProperty({
    description: 'URL da imagem do Pokémon',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  })
  sprite: string;

  @ApiProperty({
    description: 'Data de criação do Pokémon no time',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

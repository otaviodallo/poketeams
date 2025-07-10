import { ApiProperty } from '@nestjs/swagger';

export class TeamPokemonResponseDto {
  @ApiProperty({
    description: 'ID único do Pokémon no time',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do time',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  teamId: string;

  @ApiProperty({
    description: 'ID ou nome do Pokémon na PokéAPI',
    example: 'pikachu',
  })
  pokemonId: string;

  @ApiProperty({
    description: 'Data de criação do Pokémon no time',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do Pokémon no time',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

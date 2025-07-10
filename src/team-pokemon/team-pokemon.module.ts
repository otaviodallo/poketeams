import { Module } from '@nestjs/common';
import { TeamPokemonController } from './team-pokemon.controller';
import { TeamPokemonService } from './team-pokemon.service';
import { TeamPokemonRepository } from './team-pokemon.repository';
import { TeamRepository } from '../team/team.repository';

@Module({
  controllers: [TeamPokemonController],
  providers: [TeamPokemonService, TeamPokemonRepository, TeamRepository],
})
export class TeamPokemonModule {}

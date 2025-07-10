import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TeamPokemonModule } from './team-pokemon/team-pokemon.module';
import { TrainerModule } from './trainer/trainer.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [CommonModule, TrainerModule, TeamPokemonModule, TeamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

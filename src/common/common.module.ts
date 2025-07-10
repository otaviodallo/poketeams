import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PokeApiService } from './poke-api.service';

@Global()
@Module({
  providers: [PrismaService, PokeApiService],
  exports: [PrismaService, PokeApiService],
})
export class CommonModule {}

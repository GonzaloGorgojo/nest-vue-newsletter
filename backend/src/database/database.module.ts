/**
 * @file   This file defines the Database Module, with database interactions and configurations.
 * @author Gonzalo Gorgojo.
 */

import { postgresConfig } from '@/ormconfig';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...postgresConfig,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

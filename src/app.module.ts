import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'evaluacion.sqlite',
        autoLoadEntities: true,
        synchronize: true, // Only for development!
      }),
    }),
    EvaluacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

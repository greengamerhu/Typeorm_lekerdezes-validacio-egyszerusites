import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Alkalmazott from './alkamazott.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'nest_validacio',
      entities: [
        /* List of entities here */
        Alkalmazott
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
